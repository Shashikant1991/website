import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Emittable, Emitter} from '@ngxs-labs/emitter';
import {Select} from '@ngxs/store';
import {merge, Observable, Subject, timer} from 'rxjs';
import {first, map, mapTo, startWith, takeUntil} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {DemoState} from '../../../states/demo/demo.state';
import {DemoPlayerComponent} from '../demo-player/demo-player.component';

@Component({
    selector: 'ws-demo-footer',
    templateUrl: './demo-footer.component.html',
    styleUrls: ['./demo-footer.component.scss'],
    host: {
        '[class.show-dialog]': 'paused'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFooterComponent implements OnInit, OnDestroy {
    @Input()
    public demoPlayer: DemoPlayerComponent;

    public finished$: Observable<boolean>;

    @Input()
    public paused: boolean;

    @Select(DemoState.doNotPlayAgain)
    public playAgain$: Observable<boolean>;

    public showTimer = !environment.production;

    @Emitter(DemoState.stopDemo)
    public stopDemo: Emittable<boolean>;

    public timer$: Observable<number>;

    private readonly _destroyed$: Subject<void> = new Subject();

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
        if (!this.demoPlayer) {
            return;
        }

        this.timer$ = timer(0, 100).pipe(
            map(value => value * 0.1),
            takeUntil(merge(this._destroyed$, this.demoPlayer.finished))
        );

        this.finished$ = this.demoPlayer.finished.pipe(
            first(),
            mapTo(true),
            startWith(false)
        );
    }
}
