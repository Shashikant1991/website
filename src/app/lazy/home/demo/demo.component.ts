import {BreakpointObserver} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';
import {filter, map, scan, startWith, takeUntil} from 'rxjs/operators';
import {DemoPlayerComponent} from '../demo-player/demo-player.component';
import {ComponentBundle, MIN_DEMO_WIDTH} from '../demo.types';
import {createBundle} from '../scripts/load-component-sources';

@Component({
    selector: 'ws-demo',
    templateUrl: './demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit, AfterViewInit, OnDestroy {
    /**
     * A memory store that maps a component name to HTML.
     */
    public bundles$: Observable<Map<string, ComponentBundle>>;

    /**
     * Emitter for the name of a component and it's HTML source code.
     */
    public readonly createBundle$: Subject<[string, string]> = new Subject();

    /**
     * Listens for when the component is created.
     */
    @ViewChildren(DemoPlayerComponent)
    public demoPlayers: QueryList<DemoPlayerComponent>;

    /**
     * Paused state for the footer.
     */
    public showPausedFooter: boolean = true;

    /**
     * Emits when the component is destroyed
     */
    private readonly _destroyed$: Subject<void> = new Subject();

    /**
     * Constructor
     */
    public constructor(private _breakpointObserver: BreakpointObserver) {
    }

    /**
     * Selects a true emitter when the HTML for that key exists in the store.
     */
    public missingBundle(key: string): Observable<boolean> {
        return this.bundles$.pipe(
            map(m => !m.has(key)),
            startWith(true)
        );
    }

    /**
     * After view initializer.
     */
    public ngAfterViewInit(): void {
        const widthToNarrow$ = this._breakpointObserver.observe([
            `(max-width: ${MIN_DEMO_WIDTH - 1}px)`
        ]).pipe(
            map(({matches}) => matches),
            filter(Boolean),
        );

        const playerExists$ = this.demoPlayers.changes.pipe(
            filter((query: QueryList<DemoPlayerComponent>) => Boolean(query.length)),
            map(query => query.first)
        );

        combineLatest([playerExists$, widthToNarrow$]).pipe(
            map(([player]) => player),
            takeUntil(this._destroyed$)
        ).subscribe((player: DemoPlayerComponent) => player.pause());
    }

    /**
     * Destructor
     */
    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    /**
     * Initialize
     */
    public ngOnInit(): void {
        this.bundles$ = this.createBundle$.pipe(
            map<[string, string], ComponentBundle>(([name, html]) => createBundle(name, html)),
            scan<ComponentBundle, Map<string, ComponentBundle>>((m, bundle) => m.set(bundle.name, bundle), new Map()),
            filter(m => m.size === 2)
        );
    }
}
