import {concat, Observable, of, OperatorFunction} from 'rxjs';
import {concatAll, delay, map, scan} from 'rxjs/operators';

export namespace Keyboards {
    const SPEED = 100;
    const BASE_SPEED = 20;
    // const SPEED = 1;
    // const BASE_SPEED = 10;

    export interface KeyboardEvent {
        type: string;
    }

    export interface BufferEvent extends KeyboardEvent {
        column: number;
        row: number;
        text: string[][];
    }

    export function isBufferEvent(value: any): value is BufferEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'buffer';
    }

    export interface KeyEvent extends KeyboardEvent {
        value: string;
    }

    export function isKeyEvent(value: any): value is KeyEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'key';
    }

    export interface CursorEvent extends KeyboardEvent {
        column: number;
        row: number;
    }

    export function isCursorEvent(value: any): value is CursorEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'cursor';
    }

    /**
     * Creates a new empty buffer stream.
     */
    export function start(): Observable<BufferEvent> {
        return of({type: 'buffer', column: 0, row: 0, text: []});
    }

    /**
     * Applies a delay to the stream of changes to make it look like someone is typing.
     */
    function _delayStrokes<T>(): OperatorFunction<T, T> {
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
     * Inserts a character at the current cursor location and moves the cursor forward.
     */
    function _insert(source: BufferEvent, value: string): BufferEvent {
        const b = {...source};
        b.text = b.text.slice();
        if (b.text[b.row] === undefined) {
            b.text[b.row] = [];
        }
        b.text[b.row] = b.text[b.row].slice();
        b.text[b.row].splice(b.column, 0, value);
        b.column++;
        return b;
    }

    /**
     * Inserts a new line of text in the buffer.
     */
    function _newLine(source: BufferEvent): BufferEvent {
        const b = {...source};
        b.text = b.text.slice();
        b.column = 0;
        b.row++;
        if (b.row > b.text.length) {
            b.text.push([]);
        }
        return b;
    }

    function reduceKeyEvent(source: BufferEvent, event: KeyEvent): BufferEvent {
        return event.value === '\r'
            ? _newLine(source)
            : _insert(source, event.value);
    }

    function reduceCursorEvent(source: BufferEvent, event: Partial<CursorEvent>): BufferEvent {
        const b = {...source};
        if (typeof event.column !== 'undefined') {
            b.column += event.column;
        }
        if (typeof event.row !== 'undefined') {
            b.row += event.row;
        }
        return b;
    }

    /**
     * Types a sequence of characters and moves the cursor forward.
     */
    export function type(characters: string): OperatorFunction<BufferEvent, BufferEvent> {
        return function (source: Observable<BufferEvent>): Observable<BufferEvent> {
            const keys = characters.split('').map(value => ({type: 'key', value}));
            return source.pipe(append(of(...keys).pipe(_delayStrokes())));
        };
    }

    export function left(count: number = 1): OperatorFunction<BufferEvent, BufferEvent> {
        return function (source: Observable<BufferEvent>): Observable<BufferEvent> {
            const keys = Array(count).fill(null).map(() => ({type: 'cursor', column: -1}));
            return source.pipe(append(of(...keys).pipe(_delayStrokes())));
        };
    }

    export function backSpace(count: number = 1): OperatorFunction<BufferEvent, BufferEvent> {
        return function (source: Observable<BufferEvent>): Observable<BufferEvent> {
            const keys = Array(count).fill(null).map(() => ({type: 'cursor', column: -1}));
            return source.pipe(append(of(...keys).pipe(_delayStrokes())));
        };
    }

    /**
     * Appends a stream of keyboard events to the end of a buffer stream.
     */
    export function append(events: Observable<KeyboardEvent>): OperatorFunction<BufferEvent, BufferEvent> {
        return function (source: Observable<BufferEvent>): Observable<BufferEvent> {
            return concat(
                source,
                events
            ).pipe(
                scan<KeyboardEvent, BufferEvent>((acc, value) => {
                    if (isBufferEvent(value)) {
                        return value;
                    } else if (isKeyEvent(value)) {
                        return reduceKeyEvent(acc, value);
                    } else if (isCursorEvent(value)) {
                        return reduceCursorEvent(acc, value);
                    }
                    throw new Error('unexpected value in buffer stream');
                })
            );
        };
    }
}

