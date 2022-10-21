import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './patients/history/history.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'homepage', component: HomepageComponent },
      { path: 'patients', component: PatientsComponent},
    ]},
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
