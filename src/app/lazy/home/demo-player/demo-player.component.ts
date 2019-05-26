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
import {BufferEvent} from '@typewriterjs/typewriterjs';
import {BehaviorSubject, combineLatest, fromEvent, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, finalize, first, map, mapTo, pairwise, startWith, takeUntil} from 'rxjs/operators';
import {DemoPlayBackService} from '../demo-play-back/demo-play-back.service';
import {ComponentPlayback, MIN_DEMO_WIDTH} from '../demo.types';

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

/**
 * Displays the animation for the introduction.
 */
@Component({
    selector: 'ws-demo-player',
    templateUrl: './demo-player.component.html',
    styleUrls: ['./demo-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'demoPlayer'
})
export class DemoPlayerComponent implements OnInit, OnDestroy {

    public buffer$: Observable<BufferEvent>;

    /**
     * Emits when the playback of the entire intro script is finished.
     */
    @Output()
    public finished: EventEmitter<void> = new EventEmitter();

    /**
     * Updated to render the nano editor animation. Also controls the displaying of the nano editor when truthy.
     */
    public nanoBuffer: BufferEvent;

    /**
     * Emits when the user has paused the playback.
     */
    @Output()
    public paused: EventEmitter<void> = new EventEmitter();

    /**
     * Emits the paused state of true or false for playback.
     */
    public readonly paused$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Emits the HTML and CSS contents for the bookmarks component.
     */
    public playBookmarks$: Observable<ComponentPlayback>;

    /**
     * Emits the HTML and CSS contents for the summary component.
     */
    public playSummary$: Observable<ComponentPlayback>;

    /**
     * Emits the ngStyle properties to position the browser window.
     */
    public positionBrowser$: Observable<{ [key: string]: string; }>;

    /**
     * Emits the ngStyle properties to position the terminal.
     */
    public positionTerminal$: Observable<{ [key: string]: string; }>;

    /**
     * Emits when the user has resumed playback.
     */
    @Output()
    public resumed: EventEmitter<void> = new EventEmitter();

    /**
     * When false the default Angular component is rendered, when true the website components are being rendered.
     */
    public showComponents$: Observable<boolean>;

    /**
     * Emits when the component has been destroyed.
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(@Inject(WINDOW) private _wnd: Window,
                       @Inject(DOCUMENT) private _doc: Document,
                       private _demoScripts: DemoPlayBackService,
                       private _el: ElementRef<HTMLElement>,
                       private _sanitizer: DomSanitizer,
                       private _change: ChangeDetectorRef) {

    }

    /**
     * Destruction hook
     */
    public ngOnDestroy(): void {
        this._doc.body.style.perspective = undefined;
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Initialization hook
     */
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
            startWith<string, string>(null),
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

        this.showComponents$ = this._demoScripts.playBack().pipe(
            first(),
            mapTo(true),
            startWith(false),
        );

        this.playSummary$ = this._demoScripts.playBack().pipe(filter(play => play.name === 'Summary'));
        this.playBookmarks$ = this._demoScripts.playBack().pipe(filter(play => play.name === 'Bookmarks'));
    }

    /**
     * Pauses playback
     */
    public pause() {
        this.paused$.next(true);
    }

    /**
     * Resumes playback
     */
    public resume() {
        this.paused$.next(false);
    }

    /**
     * Initializations the observables used to position the windows.
     */
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
