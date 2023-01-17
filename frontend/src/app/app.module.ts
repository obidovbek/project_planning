import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { TemplateModule } from './components/template/template.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      FormsModule,
      BrowserModule,
      ReactiveFormsModule,
      AppRoutingModule,
      TemplateModule,
      SharedModule,
      BrowserAnimationsModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SharedModule]
})
export class AppModule { }
