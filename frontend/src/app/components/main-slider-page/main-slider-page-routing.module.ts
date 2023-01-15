import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSliderPageComponent } from './main-slider-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainSliderPageComponent,
        data: {
          title: "Kirish",
          breadcrumb: "Kirish"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSliderPageRoutingModule { }
