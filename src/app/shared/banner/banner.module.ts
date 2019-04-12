import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    IntroComponent
  ],
  declarations: [IntroComponent]
})
export class BannerModule {
}
