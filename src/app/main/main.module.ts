import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TopBarModule} from '../shared/top-bar/top-bar.module';

import { MainRoutingModule } from './main-routing.module';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    MainRoutingModule,
    TopBarModule
  ],
  providers: [],
  bootstrap: [BodyComponent]
})
export class MainModule { }
