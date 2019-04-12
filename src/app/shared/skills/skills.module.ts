import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { SkillsComponent } from './skills/skills.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SkillsComponent
  ],
  declarations: [SkillsComponent]
})
export class SkillsModule {
}
