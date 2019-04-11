import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';
import {TopBarMenu} from '../../shared/top-bar/top-bar.types';

/* tslint:disable:component-selector */
@Component({
  selector: 'body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public menu: TopBarMenu[];

  public ngOnInit(): void {
    this.menu = [
      {title: of('Intro'), active: of(false), url: of('#intro')},
      {title: of('Skills'), active: of(false), url: of('#skills')},
      {title: of('Experience'), active: of(false), url: of('#experience')},
      {title: of('Hire me'), active: of(false), url: of('#hireme')}
    ];
  }
}
