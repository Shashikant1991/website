import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Emittable, Emitter} from '@ngxs-labs/emitter';
import {DemoState} from '../../../../states/demo/demo.state';

@Component({
    selector: 'ws-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
    @Emitter(DemoState.restartDemo)
    public restart: Emittable<void>;
}
