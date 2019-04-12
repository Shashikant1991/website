import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgtUniversalModule} from '@ng-toolkit/universal';
import {NgxsEmitPluginModule} from '@ngxs-labs/emitter';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../../environments/environment';
import {BannerModule} from '../shared/banner/banner.module';
import {ContactModule} from '../shared/contact/contact.module';
import {HistoryModule} from '../shared/history/history.module';
import {SkillsModule} from '../shared/skills/skills.module';
import {TopBarModule} from '../shared/top-bar/top-bar.module';
import {AppState} from '../states/app/app.state';
import {BodyComponent} from './body/body.component';
import {MainRoutingModule} from './main-routing.module';
import {OutletHomeComponent} from './outlet-home/outlet-home.component';

const STATES = [
    AppState
];

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        NgxsModule.forRoot(STATES, {developmentMode: !environment.production}),
        NgxsEmitPluginModule.forRoot() as ModuleWithProviders,
        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgtUniversalModule,
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
