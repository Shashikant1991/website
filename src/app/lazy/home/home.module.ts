import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TerminalsModule} from '../../shared/terminals/terminals.module';
import {CloneComponentComponent} from './clone-component/clone-component.component';
import {DefaultAngularComponent} from './default-angular/default-angular.component';
import {BookmarksComponent} from './demo-components/bookmarks/bookmarks.component';
import {SummaryComponent} from './demo-components/summary/summary.component';
import {DemoFooterComponent} from './demo-footer/demo-footer.component';
import {DemoPlayerComponent} from './demo-player/demo-player.component';
import {HomeRoutingModule} from './home-routing.module';
import {NanoComponent} from './nano/nano.component';
import {OutletHomeComponent} from './outlet-home/outlet-home.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TerminalsModule,
        FontAwesomeModule
    ],
    declarations: [
        DefaultAngularComponent,
        DemoPlayerComponent,
        NanoComponent,
        OutletHomeComponent,
        SummaryComponent,
        CloneComponentComponent,
        DemoFooterComponent,
        BookmarksComponent
    ]
})
export class HomeModule {
}
