import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contentUser, contentAdmin } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
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
  {
    path: '',
    component: ContentLayoutComponent,
    children: contentAdmin,
    data: {
      role: 'ADMIN'
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
  {path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
