import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {faGithubSquare, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {Emittable, Emitter} from '@ngxs-labs/emitter';
import {DemoState} from '../../../../states/demo/demo.state';

@Component({
    selector: 'ws-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    public faGitHub = faGithubSquare;

    public faLinkedIn = faLinkedin;

    @Emitter(DemoState.restartDemo)
    public restart: Emittable<void>;
}
