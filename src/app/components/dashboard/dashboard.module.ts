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
import { MatDatepickerModule } from '@angular/material/datepicker';

import { RecetaComponent } from './receta/receta.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';
import { NuevaRecetaComponent } from './nueva-receta/nueva-receta.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SessionExpiredDialogComponentComponent } from './session-expired-dialog-component/session-expired-dialog-component.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { GenerarExpedienteComponent } from './expediente/generar-expediente/generar-expediente.component';
import { GenerarAntecedenteComponent } from './prueba/generar-antecedente/generar-antecedente.component';
import { NuevaCitaUsuarioComponent } from './nueva-cita-usuario/nueva-cita-usuario.component';


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
    NuevaCitaComponent,
    NuevaRecetaComponent,BreadcrumbComponent, NosotrosComponent, ServiciosComponent, SessionExpiredDialogComponentComponent, ConfiguracionComponent, GenerarExpedienteComponent, GenerarAntecedenteComponent, NuevaCitaUsuarioComponent

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
    DateTimePickerModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class DashboardModule { }
