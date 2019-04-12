import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BannerModule} from '../shared/banner/banner.module';
import {ContactModule} from '../shared/contact/contact.module';
import {HistoryModule} from '../shared/history/history.module';
import {SkillsModule} from '../shared/skills/skills.module';
import {TopBarModule} from '../shared/top-bar/top-bar.module';
import {BodyComponent} from './body/body.component';

import {MainRoutingModule} from './main-routing.module';
import {OutletHomeComponent} from './outlet-home/outlet-home.component';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        MainRoutingModule,
        TopBarModule,
        BannerModule,
        ContactModule,
        HistoryModule,
        SkillsModule
    ],
    declarations: [
        BodyComponent,
        OutletHomeComponent
    ],
    bootstrap: [BodyComponent]
})
export class MainModule {
}
