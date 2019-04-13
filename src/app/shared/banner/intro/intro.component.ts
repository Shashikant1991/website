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

    public buffer$: Observable<Keyboards.Buffer>;

    public ngOnInit(): void {
        this.buffer$ = Keyboards.start().pipe(
            Keyboards.type('Hello, I\'m Nick Foscarini a Full Stack developer in Toronto, Ontario.')
        );
    }
}
