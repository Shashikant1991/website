import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Keyboards} from '../../keyboards/keyboards.types';

@Component({
    selector: 'ws-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent implements OnInit {

    public buffer$: Observable<Keyboards.BufferEvent>;

    public ngOnInit(): void {
        this.buffer$ = Keyboards.start().pipe(
            Keyboards.type('Hello, I\'m Nick Foscarini a Full Stack developer in Markham, Ontario.'),
            Keyboards.left(10),
            Keyboards.backSpace(7),
            Keyboards.type('Toronto')
            // Keyboards.type('I have 10 years of JavaScript programming with 8 years as an Angular developer.\r'),
            // Keyboards.type('Seeking a new role as a front-end developer with a focus on good product design, animated UX ' +
            //     'experiences and modern technology.')
        );
    }
}
