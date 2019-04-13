import {EngineEvents} from '../engine.events';

export function CursorMoveReducer(source: EngineEvents.BufferEvent, event: Partial<EngineEvents.CursorMoveEvent>): EngineEvents.BufferEvent {
    const b = {...source};
    if (typeof event.column !== 'undefined') {
        b.column += event.column;
    }
    if (typeof event.row !== 'undefined') {
        b.row += event.row;
    }
    return b;
}
