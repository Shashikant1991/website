import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {EngineEvents} from '../engine/engine.events';

@Component({
    selector: 'ws-render-buffer',
    templateUrl: './render-buffer.component.html',
    styleUrls: ['./render-buffer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderBufferComponent {
    @Input()
    public buffer: EngineEvents.BufferEvent;

    public toHtml(indx: number): string {
        // @todo move to the render package
        const text = this.buffer.text[indx].slice();
        if (indx === this.buffer.row) {
            text.splice(this.buffer.column, 0, '<span class="cursor"></span>');
        }
        const html = text.join('');
        return html === '' ? '&nbsp;' : html;
    }

    public trackByLine = (indx) => this.toHtml(indx);
}
