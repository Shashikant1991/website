import {EngineEvents} from './engine.events';

/**
 * Inserts a character at the current cursor location and moves the cursor forward.
 */
export function reduceInsert(source: EngineEvents.BufferEvent, value: string): EngineEvents.BufferEvent {
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
export function reduceNewLine(source: EngineEvents.BufferEvent): EngineEvents.BufferEvent {
    const b = {...source};
    b.text = b.text.slice();
    b.column = 0;
    b.row++;
    if (b.row > b.text.length) {
        b.text.push([]);
    }
    return b;
}

export function reduceKeyEvent(source: EngineEvents.BufferEvent, event: EngineEvents.KeyEvent): EngineEvents.BufferEvent {
    return event.value === '\r'
        ? reduceNewLine(source)
        : reduceInsert(source, event.value);
}

export function reduceCursorEvent(source: EngineEvents.BufferEvent, event: Partial<EngineEvents.CursorEvent>): EngineEvents.BufferEvent {
    const b = {...source};
    if (typeof event.column !== 'undefined') {
        b.column += event.column;
    }
    if (typeof event.row !== 'undefined') {
        b.row += event.row;
    }
    return b;
}

