import { LoginFormComponent } from './components/login-form/login-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GuardGuard } from './guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { MapaSitioComponent } from './components/mapa-sitio/mapa-sitio.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'login-form', component: LoginFormComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'dashboard', canActivate: [GuardGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule) },
  { path: 'mapaSitio', component:MapaSitioComponent, data:{titulo:'mapaSitio'}},
  { path: "**", component: Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
