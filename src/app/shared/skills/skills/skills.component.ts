import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'ws-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
}
