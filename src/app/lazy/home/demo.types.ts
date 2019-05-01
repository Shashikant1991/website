import {Observable, Subject} from 'rxjs';
import {EngineEvents} from '../../shared/keyboards/engine/engine.events';

export const MIN_DEMO_WIDTH = 1024;

export interface ComponentBundle {
    html: string[];
    scss: string[];
}

export interface ComponentPlayback {
    html: number;
    name: string;
    style: number;
}

export interface CreateComponentOptions {
    cancel$: Observable<any>;
    children$: Subject<Observable<EngineEvents.BufferEvent>>;
    component: string;
    message: string[];
    path: string;
    pause$: Observable<boolean>;
    playBack$: Subject<ComponentPlayback>;
}