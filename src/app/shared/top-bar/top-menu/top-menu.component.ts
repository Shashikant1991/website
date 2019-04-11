import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {TopBarMenu} from '../top-bar.types';

@Component({
  selector: 'ws-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent {
  @Input()
  public menu: TopBarMenu[];
}
