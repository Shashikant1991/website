export namespace EngineEvents {
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
}
