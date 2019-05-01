import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TerminalsModule} from '../../shared/terminals/terminals.module';
import {DefaultAngularComponent} from './default-angular/default-angular.component';
import {ContactComponent} from './demo-components/contact/contact.component';
import {ExperienceComponent} from './demo-components/experience/experience.component';
import {MenuComponent} from './demo-components/menu/menu.component';
import {SkillsComponent} from './demo-components/skills/skills.component';
import {SummaryComponent} from './demo-components/summary/summary.component';
import {DemoPlayerComponent} from './demo-player/demo-player.component';
import {HomeRoutingModule} from './home-routing.module';
import {NanoComponent} from './nano/nano.component';
import {OutletHomeComponent} from './outlet-home/outlet-home.component';
import { CloneComponentComponent } from './clone-component/clone-component.component';
import { DemoFooterComponent } from './demo-footer/demo-footer.component';
import { BookmarksComponent } from './demo-components/bookmarks/bookmarks.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TerminalsModule
    ],
    declarations: [
        ContactComponent,
        DefaultAngularComponent,
        DemoPlayerComponent,
        ExperienceComponent,
        MenuComponent,
        NanoComponent,
        OutletHomeComponent,
        SkillsComponent,
        SummaryComponent,
        CloneComponentComponent,
        DemoFooterComponent,
        BookmarksComponent
    ]
})
export class HomeModule {
}
