import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {KeyboardsModule} from '../keyboards/keyboards.module';
import {IntroComponent} from './intro/intro.component';

@NgModule({
    imports: [
        CommonModule,
        KeyboardsModule
    ],
    exports: [
        IntroComponent
    ],
    declarations: [IntroComponent]
})
export class BannerModule {
}
