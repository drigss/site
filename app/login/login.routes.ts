import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: '', loadChildren: '../paginas/paginas.module#PaginasModule' }
];
