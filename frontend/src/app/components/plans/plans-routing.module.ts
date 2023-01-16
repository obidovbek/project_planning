import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansComponent } from './plans.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PlansComponent,
        data: {
          title: "Loyihalar",
          breadcrumb: "Loyihalar"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
