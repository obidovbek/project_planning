import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { PlansRoutingModule } from './plans-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ALL_TAIGA_UI_MODULES } from 'src/app/shared/all-taigu-modules/all-taigu-modules.module';
import { TuiTableFiltersDirective } from '@taiga-ui/addon-table';
import { TemplateModule } from '../template/template.module';

@NgModule({
  declarations: [
    PlansComponent,
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TemplateModule,
    SharedModule,
    ...ALL_TAIGA_UI_MODULES,
  ],
  providers: [
    TuiTableFiltersDirective
  ]
})
export class PlansModule { }
