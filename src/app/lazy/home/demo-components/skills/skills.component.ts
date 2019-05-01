import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ws-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
}
