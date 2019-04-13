export namespace EngineEvents {
    export interface EventType {
        type: string;
    }

    export interface BufferEvent extends EventType {
        column: number;
        row: number;
        text: string[][];
    }

    export function isBufferEvent(value: any): value is BufferEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'buffer';
    }

    export interface DelayEvent extends EventType {
        delay?: number;
    }

    export interface KeyPressEvent extends DelayEvent {
        value: string;
    }

    export function isKeyPressEvent(value: any): value is KeyPressEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'key';
    }

    export interface CursorMoveEvent extends DelayEvent {
        column?: number;
        row?: number;
    }

    export function isCursorEvent(value: any): value is CursorMoveEvent {
        return typeof value === 'object' && 'type' in value && value['type'] === 'cursor';
    }
}
