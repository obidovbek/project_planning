import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
// import { HeaderComponent } from './components/header/header.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
// import { PromptComponent } from './components/modal/prompt/prompt.component';
// import { FormsModule } from '@angular/forms';
// import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
// import { AddNewLessonModalComponent } from './components/header/modal/add-new-lesson/add-new-lesson.component';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { DayNamePipe } from 'src/app/shared/pipes/day-name.component';
@NgModule({
    declarations: [
      HeaderComponent,
    //   SidebarComponent,
      LeftSidebarComponent,
      ContentLayoutComponent,
    //   PromptComponent,
    //   MultiSelectDropdownComponent,
    //   AddNewLessonModalComponent,
    //   DayNamePipe
    //   RightSidebarComponent,
    //   LoadingComponent,
    //   MultiSelectDropdownComponent,
    //   PromptComponent,
    //   ConfirmComponent,
    //   AlertComponent
    ],
    imports: [
      CommonModule,
    // //   IonicModule.forRootp09(),
      RouterModule,
    //   FormsModule,
    //   AutocompleteLibModule
    // //   DynamicFormModule,
    // //   FormsModule,
    // //   ReactiveFormsModule
    ],
    providers: [
    //   NavService, 
    //   WINDOW_PROVIDERS,
    //   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    exports: [
    //   MultiSelectDropdownComponent,
    //   DayNamePipe
    //     // FeatherIconsComponent, 
    //     // ToggleFullscreenDirective, 
    //     // MultiSelectDropdownComponent
        
    ]
  })
  export class SharedModule { }
  