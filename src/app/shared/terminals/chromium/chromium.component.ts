import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ws-chromium',
    templateUrl: './chromium.component.html',
    styleUrls: ['./chromium.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChromiumComponent {
    @Input()
    public tabName: string = 'Reactgular';
}
