import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TopBarMenu} from '../top-bar.types';

@Component({
  selector: 'ws-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  @Input()
  public menu: TopBarMenu[];
}
