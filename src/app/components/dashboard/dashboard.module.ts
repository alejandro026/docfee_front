import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PruebaComponent } from './prueba/prueba.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from 'src/app/material/material.module';
import { IgxCalendarModule } from 'igniteui-angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PatientsComponent } from './patients/patients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './patients/patient/patient.component';
import { HistoryComponent } from './patients/history/history.component';
import { CitasComponent } from './citas/citas.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { DetalleExpedienteComponent } from './detalle-expediente/detalle-expediente.component';
import { AgregarComponent } from './prueba/agregar/agregar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { RecetaComponent } from './receta/receta.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomepageComponent,
    PatientsComponent,
    PatientComponent,
    HistoryComponent,
    PruebaComponent,
    CitasComponent,
    DocumentosComponent,
    TratamientoComponent,
    ExpedienteComponent,
    DetalleExpedienteComponent,
    AgregarComponent,

    RecetaComponent,
    NuevaCitaComponent


  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    IgxCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    DateTimePickerModule
  ]
})
export class DashboardModule { }
