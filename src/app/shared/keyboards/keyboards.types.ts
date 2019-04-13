import {concat, Observable, of, OperatorFunction} from 'rxjs';
import {concatAll, delay, last, map, scan} from 'rxjs/operators';

export namespace Keyboards {
    /**
     * A buffer of text with a cursor location for editing.
     */
    export interface Buffer {
        column: number;
        row: number;
        text: string[][];
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
    function delayStrokes(): OperatorFunction<Buffer, Buffer> {
        return function (source: Observable<Buffer>): Observable<Buffer> {
            return source.pipe(
                map(s => {
                    const r = Math.floor(Math.random() * Math.floor(100));
                    return of(s).pipe(delay(20 + r));
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
     * Types a sequence of characters at current cursor location.
     */
    export function type(characters: string): OperatorFunction<Buffer, Buffer> {
        return function (source: Observable<Buffer>): Observable<Buffer> {
            const strokes$ = concat(
                source.pipe(last()),
                of(...characters.split(''))
            ).pipe(
                scan<string, Buffer>((acc, value) => insert(acc, value))
            );
            return concat(source, strokes$.pipe(delayStrokes()));
        };
    }
}

