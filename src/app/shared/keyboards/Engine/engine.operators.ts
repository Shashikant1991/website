import {concat, Observable, of, OperatorFunction} from 'rxjs';
import {concatAll, delay, map, scan} from 'rxjs/operators';
import {EngineEvents} from './engine.events';
import {reduceCursorEvent, reduceKeyEvent} from './engine.reducers';

/**
 * Types a sequence of characters and moves the cursor forward.
 */
export function type(characters: string): OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent> {
    return function (source: Observable<EngineEvents.BufferEvent>): Observable<EngineEvents.BufferEvent> {
        const keys = characters.split('').map(value => ({type: 'key', value} as EngineEvents.KeyEvent));
        return source.pipe(_reduce(of(...keys).pipe(_delayReducers())));
    };
}

export function left(count: number = 1): OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent> {
    return function (source: Observable<EngineEvents.BufferEvent>): Observable<EngineEvents.BufferEvent> {
        const keys = Array(count).fill(null).map(() => ({type: 'cursor', column: -1}));
        return source.pipe(_reduce(of(...keys).pipe(_delayReducers())));
    };
}

export function backSpace(count: number = 1): OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent> {
    return function (source: Observable<EngineEvents.BufferEvent>): Observable<EngineEvents.BufferEvent> {
        const keys = Array(count).fill(null).map(() => ({type: 'cursor', column: -1}));
        return source.pipe(_reduce(of(...keys).pipe(_delayReducers())));
    };
}

/**
 * Applies a delay to the stream of changes to make it look like someone is typing.
 */
function _delayReducers<T>(): OperatorFunction<T, T> {
    const SPEED = 100;
    const BASE_SPEED = 20;
// const SPEED = 1;
// const BASE_SPEED = 10;
    return function (source: Observable<T>): Observable<T> {
        return source.pipe(
            map(s => {
                const r = Math.floor(Math.random() * Math.floor(SPEED));
                return of(s).pipe(delay(BASE_SPEED + r));
            }),
            concatAll()
        );
    };
}

/**
 * Appends a stream of keyboard events to the end of a buffer stream.
 */
function _reduce(events: Observable<EngineEvents.KeyboardEvent>): OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent> {
    return function (source: Observable<EngineEvents.BufferEvent>): Observable<EngineEvents.BufferEvent> {
        return concat(
            source,
            events
        ).pipe(
            scan<KeyboardEvent, EngineEvents.BufferEvent>((acc, value) => {
                if (EngineEvents.isBufferEvent(value)) {
                    return value;
                } else if (EngineEvents.isKeyEvent(value)) {
                    return reduceKeyEvent(acc, value);
                } else if (EngineEvents.isCursorEvent(value)) {
                    return reduceCursorEvent(acc, value);
                }
                throw new Error('unexpected value in buffer stream');
            })
        );
    };
}
