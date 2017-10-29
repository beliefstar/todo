
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

import { RouteStateService } from './route-state.service';
import {TodoesComponent} from './todoes/todoes.component';

const approute: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'todo',
    component: TodoesComponent,
    canActivate: [ RouteStateService ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
export const AppRouting = RouterModule.forRoot(approute);
