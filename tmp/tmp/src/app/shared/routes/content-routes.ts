import { Routes } from '@angular/router';

export const contentUser: Routes = [
  {
    path: 'template',
    loadChildren: () => import('../../components/template/template.module').then(m => m.TemplateModule),
    data: {
      breadcrumb: 'Shablon'
    }
  }
];

