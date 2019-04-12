import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutletHomeComponent} from './outlet-home/outlet-home.component';

const routes: Routes = [
  {
    path: '',
    component: OutletHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
