import {concat, Observable, of, OperatorFunction} from 'rxjs';
import {concatAll, delay, map, scan} from 'rxjs/operators';
import {EngineEvents} from './engine.events';
import {BackspaceReducer} from './reducers/backspace.reducer';
import {CursorMoveReducer} from './reducers/cursor-move.reducer';
import {KeyPressReducer} from './reducers/key-press.reducer';
import {PauseReducer} from './reducers/pause.reducer';

export namespace Keyboard {
    export type BufferOperator = OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent>;

    /**
     * Types a sequence of characters and moves the cursor forward.
     */
    export function type(characters: string): BufferOperator {
        return _reduceBuffer(() => characters.split('').map(value => ({type: 'key', value})));
    }

    /**
     * Types a new line.
     */
    export function newLine(count: number = 1): BufferOperator {
        return type('\r'.repeat(count));
    }

    /**
     * Moves the cursor to the left.
     */
    export function left(count: number = 1): BufferOperator {
        return _reduceBuffer(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'left'})));
    }

    /**
     * Moves the cursor to the right.
     */
    export function right(count: number = 1): BufferOperator {
        return _reduceBuffer(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'right'})));
    }

    /**
     * Moves the cursor to the start of the line.
     */
    export function home(): BufferOperator {
        return _reduceBuffer(() => [{type: 'cursor', direction: 'home'}]);
    }

    /**
     * Moves the cursor to the end of the line.
     */
    export function end(): BufferOperator {
        return _reduceBuffer(() => [{type: 'cursor', direction: 'end'}]);
    }

    /**
     * Deletes a character to the left.
     */
    export function backSpace(count: number = 1): BufferOperator {
        return _reduceBuffer(() => Array(count).fill(null).map(() => ({type: 'backspace'})));
    }

    /**
     * Adds a delay to the buffer stream.
     */
    export function pause(ms: number = 2000): BufferOperator {
        return _reduceBuffer(() => [{type: 'pause', delay: ms}]);
    }
}

function _reduceBuffer(events: () => EngineEvents.DelayEvent[]) {
    return function (source: Observable<EngineEvents.BufferEvent>): Observable<EngineEvents.BufferEvent> {
        const events$ = of(...events());
        return source.pipe(_reduce(events$.pipe(_delayEvents())));
    };
}

/**
 * Applies a delay to the stream of changes to make it look like someone is typing.
 */
function _delayEvents(): OperatorFunction<EngineEvents.DelayEvent, EngineEvents.DelayEvent> {
    const SPEED = 25;
    const BASE_SPEED = 5;
    return function (source: Observable<EngineEvents.DelayEvent>): Observable<EngineEvents.DelayEvent> {
        return source.pipe(
            map(s => {
                const time = typeof s.delay === 'undefined'
                    ? BASE_SPEED + Math.floor(Math.random() * Math.floor(SPEED))
                    : s.delay;
                return of(s).pipe(delay(time));
            }),
            concatAll()
        );
    };
}

/**
 * Appends a stream of keyboard events to the end of a buffer stream.
 */
function _reduce(events: Observable<EngineEvents.EventType>): OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent> {
    return function (source: Observable<EngineEvents.BufferEvent>): Observable<EngineEvents.BufferEvent> {
        return concat(
            source,
            events
        ).pipe(
            scan<KeyboardEvent, EngineEvents.BufferEvent>((acc, value) => {
                if (EngineEvents.isBufferEvent(value)) {
                    return value;
                } else if (EngineEvents.isKeyPressEvent(value)) {
                    return KeyPressReducer(acc, value);
                } else if (EngineEvents.isCursorEvent(value)) {
                    return CursorMoveReducer(acc, value);
                } else if (EngineEvents.isBackspaceEvent(value)) {
                    return BackspaceReducer(acc, value);
                } else if (EngineEvents.isPauseEvent(value)) {
                    return PauseReducer(acc);
                }
                throw new Error('unexpected value in buffer stream');
            })
        );
    };
}
