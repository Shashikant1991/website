import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {Keyboards} from '../keyboards.types';

@Component({
    selector: 'ws-render-keyboards',
    templateUrl: './render-keyboards.component.html',
    styleUrls: ['./render-keyboards.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderKeyboardsComponent {
    @Input()
    public buffer: Keyboards.BufferEvent;

    public toHtml(indx: number): string {
        const text = this.buffer.text[indx].slice();
        if (indx === this.buffer.row) {
            text.splice(this.buffer.column, 0, '<span class="cursor"></span>');
        }
        return text.join('');
    }

    public trackByLine = (indx) => this.toHtml(indx);
}
