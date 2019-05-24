import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {BufferEvent} from 'rg-animated-typing/core/events/buffer.event';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'ws-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalComponent implements OnChanges, OnInit, OnDestroy {
    @Input()
    public buffer: BufferEvent;

    private _changes$: Subject<void> = new Subject();

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(private _el: ElementRef<HTMLElement>) {

    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('buffer' in changes) {
            window.setTimeout(() => this._changes$.next());
        }
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
        this._changes$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(() => this._el.nativeElement.scrollTo(0, this._el.nativeElement.scrollHeight));
    }
}
