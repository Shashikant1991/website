import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RenderKeyboardsComponent} from './RenderKeyboards/render-keyboards.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RenderKeyboardsComponent
    ],
    exports: [
        RenderKeyboardsComponent
    ]
})
export class KeyboardsModule {
}
