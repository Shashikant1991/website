import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ws-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
}
