import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: '#PlatziConf',
    loadComponent: () => import('./pages/slides/slides.component')
  }
];
