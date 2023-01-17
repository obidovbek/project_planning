import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contentUser, contentAdmin } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
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
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: contentAdmin,
    data: {
      role: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    data: {
      breadcrumb: 'Kirish'
    },
    canActivate: [AutoLoginGuard]
  },
  {path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
