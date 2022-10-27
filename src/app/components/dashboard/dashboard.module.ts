import { PruebaComponent } from './prueba/prueba.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { IgxCalendarModule } from 'igniteui-angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PatientsComponent } from './patients/patients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './patients/patient/patient.component';
import { HistoryComponent } from './patients/history/history.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomepageComponent,
    PatientsComponent,
    PatientComponent,
    HistoryComponent,
    PruebaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    IgxCalendarModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
