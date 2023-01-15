import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { ALL_TAIGA_UI_MODULES } from './all-taigu-modules/all-taigu-modules.module';
import { TuiDialogComponent } from './components/taiga-ui/tui-dialog/tui-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_ICONS_PATH, tuiIconsPathFactory,  TUI_SANITIZER } from "@taiga-ui/core";
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify'

@NgModule({
    declarations: [
      HeaderComponent,
      LeftSidebarComponent,
      ContentLayoutComponent,
      TuiDialogComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      ...ALL_TAIGA_UI_MODULES
    ],
    providers: [
      {
        provide: TUI_ICONS_PATH,
        useValue: tuiIconsPathFactory('https://taiga-ui.dev/assets/taiga-ui/icons'),
      },
      {
        provide: TUI_SANITIZER,
        useClass: NgDompurifySanitizer,
      },
    ],
    exports: [
      TuiDialogComponent
    ]
  })
  export class SharedModule { }
  