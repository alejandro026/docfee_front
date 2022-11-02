import { PruebaComponent } from './prueba/prueba.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './patients/history/history.component';
import { PatientsComponent } from './patients/patients.component';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'homepage', component: HomepageComponent },
      { path: 'prueba', component: PruebaComponent},
      { path: 'patients', component: PatientsComponent},
      { path: 'citas', component: CitasComponent},



    ]},
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
