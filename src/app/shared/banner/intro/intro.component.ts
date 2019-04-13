import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EngineEvents} from '../../keyboards/engine/engine.events';
import {start} from '../../keyboards/engine/engine.observables';
import {Keyboard} from '../../keyboards/engine/engine.operators';

@Component({
    selector: 'ws-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent implements OnInit {

    public buffer$: Observable<EngineEvents.BufferEvent>;

    public ngOnInit(): void {
        this.buffer$ = start().pipe(
            Keyboard.type('Hello, I\'m Nick Foscarini a Full Stack developer in Markham, Ontario.'),
            Keyboard.left(10),
            Keyboard.backSpace(7),
            Keyboard.type('Toronto'),
            Keyboard.end(),
            Keyboard.pause(),
            Keyboard.newLine(),
            Keyboard.type('I have 10 years of JavaScript programming with 8 years as an Angular developer.'),
            Keyboard.pause(),
            Keyboard.newLine(),
            Keyboard.type('Seeking a new role as a front-end developer with a focus on good product design, animated UX ' +
                'experiences and modern technology.')
        );
    }
}
