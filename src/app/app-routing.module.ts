import { GuardGuard } from './guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/AuthService.service';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [GuardGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule) },
  { path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
