import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BufferEvent} from '../../keyboards/engine/engine.events';
import {start} from '../../keyboards/engine/engine.observables';
import {backSpace, left, type} from '../../keyboards/engine/engine.operators';

@Component({
    selector: 'ws-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent implements OnInit {

    public buffer$: Observable<BufferEvent>;

    public ngOnInit(): void {
        this.buffer$ = start().pipe(
            type('Hello, I\'m Nick Foscarini a Full Stack developer in Markham, Ontario.'),
            left(10),
            backSpace(7),
            type('Toronto')
            // Keyboards.type('I have 10 years of JavaScript programming with 8 years as an Angular developer.\r'),
            // Keyboards.type('Seeking a new role as a front-end developer with a focus on good product design, animated UX ' +
            //     'experiences and modern technology.')
        );
    }
}
