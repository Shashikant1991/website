import {EngineEvents} from '../engine.events';

/**
 * Does not mutate the source.
 */
export function PauseReducer(source: EngineEvents.BufferEvent): EngineEvents.BufferEvent {
    return source;
}
