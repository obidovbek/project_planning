import { Routes } from '@angular/router';

export const contentUser: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('../../components/main-slider-page/main-slider-page.module').then(m => m.MainSliderPageModule),
    data: {
      breadcrumb: 'Kirish'
    }
  },
  {
    path: 'template',
    loadChildren: () => import('../../components/template/template.module').then(m => m.TemplateModule),
    data: {
      breadcrumb: 'Shablon'
    }
  }
];
export const contentAdmin: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../../components/login/login.module').then(m => m.LoginModule),
    data: {
      breadcrumb: 'Kirish'
    }
  },
  {
    path: 'plans',
    loadChildren: () => import('../../components/plans/plans.module').then(m => m.PlansModule),
    data: {
      breadcrumb: 'Loyihalar'
    }
  },
  
];

