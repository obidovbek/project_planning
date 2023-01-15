import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { TemplateRoutingModule } from './template-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FontAwesomeModule,
    MasonryGalleryModule
  ]
})
export class TemplateModule { }
