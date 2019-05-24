import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WINDOW} from '@ng-toolkit/universal';
import {BufferEvent} from 'rg-animated-typing';
import {BehaviorSubject, combineLatest, fromEvent, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, finalize, map, pairwise, startWith, takeUntil} from 'rxjs/operators';
import {DemoPlayBackService} from '../demo-play-back/demo-play-back.service';
import {ComponentPlayback, MIN_DEMO_WIDTH} from '../demo.types';

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

@Component({
    selector: 'ws-demo-player',
    templateUrl: './demo-player.component.html',
    styleUrls: ['./demo-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'demoPlayer'
})
export class DemoPlayerComponent implements OnInit, OnDestroy {

    public buffer$: Observable<BufferEvent>;

    @Output()
    public finished: EventEmitter<void> = new EventEmitter();

    public nanoBuffer: BufferEvent;

    @Output()
    public paused: EventEmitter<void> = new EventEmitter();

    public readonly paused$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public playBackContact$: Observable<ComponentPlayback>;

    public playBackExperience$: Observable<ComponentPlayback>;

    public playBackSkills$: Observable<ComponentPlayback>;

    public playBackSummary$: Observable<ComponentPlayback>;

    public positionBrowser$: Observable<any>;

    public positionTerminal$: Observable<any>;

    @Output()
    public resumed: EventEmitter<void> = new EventEmitter();

    public showComponents = false;

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(@Inject(WINDOW) private _wnd: Window,
                       @Inject(DOCUMENT) private _doc: Document,
                       private _demoScripts: DemoPlayBackService,
                       private _el: ElementRef<HTMLElement>,
                       private _sanitizer: DomSanitizer,
                       private _change: ChangeDetectorRef) {

    }

    public isPaused() {
        return this.paused$.getValue();
    }

    public ngOnDestroy(): void {
        this._doc.body.style.perspective = undefined;
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
        this._doc.body.style.perspective = '1500px';
        this._animatePositions();

        this.paused$.pipe(
            distinctUntilChanged(),
            takeUntil(this._destroyed$)
        ).subscribe(value => {
            if (value) {
                this.paused.emit();
            } else {
                this.resumed.emit();
            }
        });

        this.buffer$ = this._demoScripts.play(this._destroyed$, this.paused$.asObservable()).pipe(
            finalize(() => this.finished.emit()),
            takeUntil(this._destroyed$)
        );

        this._demoScripts.stage().pipe(
            startWith(null),
            pairwise(),
            takeUntil(this._destroyed$)
        ).subscribe(([previous, next]) => {
            if (previous !== null) {
                this._el.nativeElement.classList.remove(`stage-${previous}`);
            }
            this._el.nativeElement.classList.add(`stage-${next}`);
        });

        this._demoScripts.nanoScripts().pipe(
            takeUntil(this._destroyed$)
        ).subscribe(script => {
            script.pipe(
                finalize(() => this.nanoBuffer = undefined),
                takeUntil(this._destroyed$)
            ).subscribe(buffer => {
                this.nanoBuffer = buffer;
                this._change.markForCheck();
            });
        });

        this._demoScripts.playBack().pipe(
            // @todo for debugging
            // first(),
            takeUntil(this._destroyed$)
        ).subscribe((value) => {
            this.showComponents = true;
            this._change.markForCheck();
        });

        this.playBackSummary$ = this._demoScripts.playBack().pipe(filter(play => play.name === 'Summary'));
        this.playBackSkills$ = this._demoScripts.playBack().pipe(filter(play => play.name === 'Skills'));
        this.playBackExperience$ = this._demoScripts.playBack().pipe(filter(play => play.name === 'Experience'));
        this.playBackContact$ = this._demoScripts.playBack().pipe(filter(play => play.name === 'Contact'));
    }

    public pause() {
        this.paused$.next(true);
    }

    public resume() {
        this.paused$.next(false);
    }

    private _animatePositions() {
        const width$ = fromEvent(this._wnd, 'resize').pipe(
            map(() => this._wnd.innerWidth),
            startWith(this._wnd.innerWidth)
        );

        this.positionTerminal$ = combineLatest([width$, this._demoScripts.layout()]).pipe(
            map(([width, layout]) => {
                const delta = 1 - (Math.min(1024, width - MIN_DEMO_WIDTH) / 1024);
                const angle = lerp(0, 20, delta);
                return layout === 'single'
                    ? {'max-width': '50%', 'transform': 'translate(50%, 10%)'}
                    : {
                        'max-width': '47%',
                        'transform': angle === 0
                            ? `translate(${lerp(3, 8, delta)}%, 10%)`
                            : `translate(${lerp(3, 8, delta)}%, 10%) rotateY(${lerp(0, 20, delta)}deg)`
                    };
            })
        );

        this.positionBrowser$ = combineLatest([width$, this._demoScripts.layout()]).pipe(
            map(([width, layout]) => {
                const delta = 1 - (Math.min(1024, width - MIN_DEMO_WIDTH) / 1024);
                const angle = lerp(0, -20, delta);
                return layout === 'single'
                    ? undefined
                    : {
                        'max-width': '47%',
                        'transform': angle === 0
                            ? `translate(${lerp(109, 106, delta)}%, 10%)`
                            : `translate(${lerp(109, 106, delta)}%, 10%) rotateY(${angle}deg)`
                    };
            })
        );
    }
}
