import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [BodyComponent]
})
export class MainModule { }
