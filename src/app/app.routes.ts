import { Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { ControlComponent } from './components/control/control.component';

export const routes: Routes = [
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'control',
    component: ControlComponent
  }
];
