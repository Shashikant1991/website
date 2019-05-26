import {DOCUMENT} from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {WINDOW} from '@ng-toolkit/universal';
import * as diff from 'fast-diff';
import {ComponentPlayback} from '../demo.types';
import {loadComponentCss} from '../scripts/load-component-bundles';

const master = 'The chicken is blue, but not really a chicken';
const slave = 'This bird is blue, but is really a dog';

function slaveOffset(m, offset, s): number {
    return Math.floor(s.length * (offset / m.length));
}

// console.log(slaveOffset(master, 15, slave));
console.log(diff(master, slave));

@Component({
    selector: 'ws-clone-component',
    templateUrl: './clone-component.component.html',
    styleUrls: ['./clone-component.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloneComponentComponent implements AfterContentInit, OnDestroy, OnChanges {
    @Input()
    public playBack: ComponentPlayback;

    public showSource = true;

    @ViewChild('sourceHtml')
    public sourceHtml: ElementRef<HTMLElement>;

    @Input()
    public tagName: string;

    private _cloneEl: HTMLElement;

    private _css: string;

    private _html: string;

    private _styleEl: HTMLElement;

    public constructor(@Inject(WINDOW) private _wnd: Window,
                       @Inject(DOCUMENT) private _doc: Document,
                       private _change: ChangeDetectorRef,
                       private _el: ElementRef<HTMLElement>) {
    }

    public ngAfterContentInit(): void {
        this._wnd.setTimeout(() => {
            this._cloneEl = this._createClone();
            this._styleEl = this._createStyle();
            this._html = this._getCloneHtml();
            this._css = loadComponentCss().get(this.tagName);
            this._css = this._css.replace(new RegExp(this.tagName, 'g'), `${this.tagName}-cloned`);
            this._doc.head.appendChild(this._styleEl);
            this._el.nativeElement.appendChild(this._cloneEl);

            this.showSource = false;
            this._change.markForCheck();
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('playBack' in changes && this.playBack) {
            this._updateHtml(this._html.substring(0, Math.floor(this._html.length * this.playBack.html)));
            this._updateStyle(this._css.substring(0, Math.floor(this._css.length * this.playBack.style)));
        }
    }

    public ngOnDestroy(): void {
        this._cloneEl.remove();
        this._styleEl.remove();
    }

    private _createClone(): HTMLElement {
        return this._doc.createElement(`${this.tagName}-cloned`);
    }

    private _createStyle(): HTMLElement {
        const style = this._doc.createElement(`style`);
        style.setAttribute('data-cloned', this.tagName);
        return style;
    }

    private _getCloneHtml(): string {
        const child = this.sourceHtml.nativeElement;
        return child.children.length === 1
            ? child.children[0].innerHTML
            : '<span>Oops! This demo is broken.</span>';
    }

    private _updateHtml(html: string) {
        this._cloneEl.innerHTML = html;
    }

    private _updateStyle(style: string) {
        this._styleEl.innerHTML = style;
    }
}
