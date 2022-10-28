import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientsComponent } from './patients/patients.component';

import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  }, { path: 'login', component: LoginComponent, canActivate: [GuardGuard], },
  { path: 'pacientes', component: PatientsComponent, canActivate: [GuardGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
