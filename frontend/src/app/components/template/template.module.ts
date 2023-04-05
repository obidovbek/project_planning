import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { TemplateRoutingModule } from './template-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ALL_TAIGA_UI_MODULES } from 'src/app/shared/all-taigu-modules/all-taigu-modules.module';

@NgModule({
  declarations: [
    TemplateComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    NgxMasonryModule,
    ReactiveFormsModule,
    SharedModule,
    ...ALL_TAIGA_UI_MODULES,
  ],
  exports: [TemplateComponent],
  providers: [

  ]
})
export class TemplateModule { }
