export namespace EngineEvents {
    export interface EventType {
        type: string;
    }

    export interface DelayEvent extends EventType {
        delay?: number;
    }

    export interface BufferEvent extends EventType {
        column: number;
        row: number;
        text: string[][];
        type: 'buffer';
    }

    export function isBufferEvent(value: any): value is BufferEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'buffer';
    }

    export interface KeyPressEvent extends DelayEvent {
        type: 'key';
        value: string;
    }

    export function isKeyPressEvent(value: any): value is KeyPressEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'key';
    }

    export interface CursorMoveEvent extends DelayEvent {
        direction: 'left' | 'right' | 'home' | 'end';
        type: 'cursor';
    }

    export function isCursorEvent(value: any): value is CursorMoveEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'cursor';
    }

    export interface BackspaceEvent extends DelayEvent {
        type: 'backspace';
    }

    export function isBackspaceEvent(value: any): value is BackspaceEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'backspace';
    }
}
