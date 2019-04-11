import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TopBarComponent} from './top-bar/top-bar.component';
import { BrandComponent } from './brand/brand.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TopBarComponent
  ],
  declarations: [
    TopBarComponent,
    BrandComponent,
    TopMenuComponent
  ]
})
export class TopBarModule {
}
