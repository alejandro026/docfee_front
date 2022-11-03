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
<<<<<<< HEAD
import { RecetaComponent } from './receta/receta.component';
=======
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';
>>>>>>> 1f7b18453a78d8fae1669dabfd27fcae90ac75df

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
      { path: 'documentos', component: DocumentosComponent},
      { path: 'tratamiento', component: TratamientoComponent},
      { path: 'expediente', component: ExpedienteComponent},
      { path: 'detalleExpedinete', component: DetalleExpedienteComponent},
<<<<<<< HEAD
      { path: 'receta', component: RecetaComponent}

=======
      { path: 'nuevaCita', component: NuevaCitaComponent}
>>>>>>> 1f7b18453a78d8fae1669dabfd27fcae90ac75df



    ]},
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
