import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contentUser } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/template',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: contentUser,
    data: {
      role: 'USER'
    },
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'auth/login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'auth/recover-pass',
  //   component: RecoverPasswordComponent,
  // },
  {path: '**', redirectTo: '/template'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
