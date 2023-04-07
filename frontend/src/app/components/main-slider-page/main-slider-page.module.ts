import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSliderPageComponent } from './main-slider-page.component';
import { MainSliderPageRoutingModule } from './main-slider-page-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ALL_TAIGA_UI_MODULES } from 'src/app/shared/all-taigu-modules/all-taigu-modules.module';
import { TemplateModule } from '../template/template.module';

@NgModule({
  declarations: [
    MainSliderPageComponent,
  ],
  imports: [
    CommonModule,
    MainSliderPageRoutingModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TemplateModule,
    SharedModule,
    ...ALL_TAIGA_UI_MODULES,
  ],
  providers: [

  ]
})
export class MainSliderPageModule { }
