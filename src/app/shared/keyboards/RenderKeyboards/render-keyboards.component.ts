import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {BufferEvent} from '../Engine/engine.events';

@Component({
    selector: 'ws-render-keyboards',
    templateUrl: './render-keyboards.component.html',
    styleUrls: ['./render-keyboards.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderKeyboardsComponent {
    @Input()
    public buffer: BufferEvent;

    public toHtml(indx: number): string {
        // @todo move to the render package
        const text = this.buffer.text[indx].slice();
        if (indx === this.buffer.row) {
            text.splice(this.buffer.column, 0, '<span class="cursor"></span>');
        }
        return text.join('');
    }

    public trackByLine = (indx) => this.toHtml(indx);
}
