import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable, of} from 'rxjs';
import {AppState} from '../../../states/app/app.state';
import {TopBarMenu} from '../top-bar.types';

@Component({
    selector: 'ws-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent implements OnInit {
    public menu: TopBarMenu[];

    @Select(AppState.topBarHeight)
    public topBarHeight$: Observable<number>;

    public ngOnInit(): void {
        this.menu = [
            {title: of('Intro'), active: of(false), url: of('#intro')},
            {title: of('Skills'), active: of(false), url: of('#skills')},
            {title: of('Experience'), active: of(false), url: of('#experience')},
            {title: of('Hire me'), active: of(false), url: of('#contact')}
        ];
    }
}
