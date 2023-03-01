import { DetalleExpedienteComponent } from './detalle-expediente/detalle-expediente.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { PruebaComponent } from './prueba/prueba.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './patients/history/history.component';
import { PatientsComponent } from './patients/patients.component';
import { CitasComponent } from './citas/citas.component';


import { RecetaComponent } from './receta/receta.component';

import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';
import { NuevaRecetaComponent } from './nueva-receta/nueva-receta.component';
import { ServiciosComponent } from './servicios/servicios.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomepageComponent, data:{titulo:''}},
      { path: 'homepage', component: HomepageComponent, data:{titulo:'homepage'} },
      { path: 'prueba', component: PruebaComponent, data:{titulo:'prueba'}},
      { path: 'patients', component: PatientsComponent, data:{titulo:'patients'}},
      { path: 'citas', component: CitasComponent, data:{titulo:'citas'}},
      { path: 'documentos', component: DocumentosComponent, data:{titulo:'documentos'}},
      { path: 'tratamiento', component: TratamientoComponent, data:{titulo:'tratamiento'}},
      { path: 'expediente', component: ExpedienteComponent, data:{titulo:'expediente'}},
      { path: 'detalleExpedinete', component: DetalleExpedienteComponent, data:{titulo:'detalleExpediente'}},
      { path: 'receta', component: RecetaComponent, data:{titulo:'receta'}},
      { path: 'nuevaCita', component: NuevaCitaComponent, data:{titulo:'nuevaCita'}},
      { path: 'nuevaReceta', component: NuevaRecetaComponent, data:{titulo:'nuevaReceta'}},
      { path: 'servicios', component: ServiciosComponent, data:{titulo:'servicios'}},




    ]},
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
