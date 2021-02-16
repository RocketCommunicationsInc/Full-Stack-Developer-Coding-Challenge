import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenicateGuard } from './core';

import {
  CreateAccountComponent, 
  LoginComponent,
} from './login';

import {
  AlertsComponent,
  ContactsComponent, 
  DashboardComponent 
} from './dashboard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create',
    component: CreateAccountComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenicateGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  } 
];

export const appComponents = [
  AlertsComponent,
  ContactsComponent,
  CreateAccountComponent,
  DashboardComponent,
  LoginComponent,
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
