import {Observable, of} from 'rxjs';
import {EngineEvents} from './engine.events';

/**
 * Creates a new empty buffer stream.
 */
export function start(): Observable<EngineEvents.BufferEvent> {
    return of({type: 'buffer', column: 0, row: 0, text: []});
}
