import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AppState} from '../../../states/app/app.state';
import {TopBarMenu} from '../top-bar.types';

@Component({
    selector: 'ws-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit, OnDestroy {
    public fragment$: Observable<string>;

    public menu: TopBarMenu[];

    @Select(AppState.topBarBrand)
    public topBarBrand$: Observable<number>;

    @Select(AppState.topBarDocked)
    public topBarDocked$: Observable<boolean>;

    @Select(AppState.topBarHeight)
    public topBarHeight$: Observable<number>;

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(private _router: Router) {

    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
        this.menu = [
            {title: 'Intro', route: ['/'], fragment: 'intro'},
            {title: 'Skills', route: ['/'], fragment: 'skills'},
            {title: 'Experience', route: ['/'], fragment: 'experience'},
            {title: 'Hire me', route: ['/'], fragment: 'contact'}
        ];

        this.fragment$ = this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map((event: NavigationEnd) => event.url.match(/#(.*)/)),
            map((match: RegExpMatchArray) => match ? match[1] : '')
        );
    }
}
