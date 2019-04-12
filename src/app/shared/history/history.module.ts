import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ExperienceComponent} from './experience/experience.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ExperienceComponent
    ],
    declarations: [ExperienceComponent]
})
export class HistoryModule {
}
