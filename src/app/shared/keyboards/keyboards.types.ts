import {concat, Observable, of, OperatorFunction} from 'rxjs';
import {concatAll, delay, map, scan} from 'rxjs/operators';

export namespace Keyboards {
    // const SPEED = 100;
    // const BASE_SPEED = 20;
    const SPEED = 1;
    const BASE_SPEED = 1;

    /**
     * A buffer of text with a cursor location for editing.
     */
    export interface Buffer {
        column: number;
        row: number;
        text: string[][];
    }

    /**
     * Type checks if a value is a buffer object.
     */
    export function isBuffer(value: any): value is Buffer {
        return typeof value === 'object'
            && 'column' in value
            && 'row' in value
            && 'text' in value;
    }

    /**
     * Creates a new empty buffer.
     */
    export function start(): Observable<Buffer> {
        return of({column: 0, row: 0, text: []});
    }

    /**
     * Applies a delay to the stream of changes to make it look like someone is typing.
     */
    function delayStrokes<T>(): OperatorFunction<T, T> {
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
    function insert(source: Buffer, value: string): Buffer {
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
    function newLine(source: Buffer): Buffer {
        const b = {...source};
        b.text = b.text.slice();
        b.column = 0;
        b.row++;
        if (b.row > b.text.length) {
            b.text.push([]);
        }
        return b;
    }

    /**
     * Types a sequence of characters and moves cursor forward.
     */
    export function type(characters: string): OperatorFunction<Buffer, Buffer> {
        return function (source: Observable<Buffer>): Observable<Buffer> {
            return concat(
                source,
                of(...characters.split('')).pipe(delayStrokes())
            ).pipe(
                scan<string, Buffer>((acc, value) => {
                    if (isBuffer(value)) {
                        return value;
                    }
                    switch (value) {
                        case '\r':
                            return newLine(acc);
                    }
                    return insert(acc, value);
                })
            );
        };
    }
}

