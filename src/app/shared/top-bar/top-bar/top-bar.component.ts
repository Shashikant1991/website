import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AppState} from '../../../states/app/app.state';

@Component({
    selector: 'ws-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
    @Select(AppState.scroll)
    public scroll$: Observable<number>;
}
