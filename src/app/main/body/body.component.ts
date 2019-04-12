import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {WINDOW} from '@ng-toolkit/universal';
import {Emittable, Emitter} from '@ngxs-labs/emitter';
import {fromEvent, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {AppState} from '../../states/app/app.state';

@Component({
    selector: 'ws-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit, OnDestroy {
    @Emitter(AppState.setScroll)
    public scroll: Emittable<number>;

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(@Inject(WINDOW) private _wnd: Window,
                       @Inject(PLATFORM_ID) private _platform_id: Object) {
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
        if (isPlatformBrowser(this._platform_id)) {
            fromEvent(this._wnd, 'scroll').pipe(
                startWith(this._wnd.scrollY),
                map(() => this._wnd.scrollY),
                takeUntil(this._destroyed$)
            ).subscribe(scroll => this.scroll.emit(scroll));
        }
    }
}
