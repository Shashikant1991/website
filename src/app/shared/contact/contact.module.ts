import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HireMeComponent} from './hire-me/hire-me.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        HireMeComponent
    ],
    declarations: [HireMeComponent]
})
export class ContactModule {
}
