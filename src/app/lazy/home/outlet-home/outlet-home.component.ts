import {BreakpointObserver} from '@angular/cdk/layout';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {filter, first, map, takeUntil} from 'rxjs/operators';
import {DemoState} from '../../../states/demo/demo.state';
import {DemoPlayerComponent} from '../demo-player/demo-player.component';
import {MIN_DEMO_WIDTH} from '../demo.types';

@Component({
    selector: 'ws-outlet-home',
    templateUrl: './outlet-home.component.html',
    styleUrls: ['./outlet-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutletHomeComponent implements OnInit, OnDestroy {
    @ViewChild(DemoPlayerComponent)
    public demoPlayer: DemoPlayerComponent;

    public paused: boolean = true;

    @Select(DemoState.playDemo)
    public playDemo$: Observable<boolean>;

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(private _breakpointObserver: BreakpointObserver) {

    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
        // @todo Check if we can switch to landscape on tables when portrait is to narrow
        // @todo screen.orientation.lock('landscape') might work on some devices
        // @todo display a message play back is paused because screen is to small when it was big enough at the start.

        this._breakpointObserver.observe([
            `(max-width: ${MIN_DEMO_WIDTH - 1}px)`
        ]).pipe(
            map(({matches}) => matches),
            filter(Boolean),
            first(),
            takeUntil(this._destroyed$)
        ).subscribe(() => this.demoPlayer.pause());
    }
}
