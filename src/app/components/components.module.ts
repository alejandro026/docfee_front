import { NgModule } from "@angular/core";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { Page404Component } from './page404/page404.component';
import { MapaSitioComponent } from './mapa-sitio/mapa-sitio.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistroComponent } from './registro/registro.component';
import { DialogModule } from 'primeng/dialog';
import { SessionExpiredDialogComponentComponent } from './deshboard/session-expired-dialog-component/session-expired-dialog-component.component';


@NgModule({
  declarations: [BreadcrumbComponent, Page404Component, MapaSitioComponent, SessionExpiredDialogComponentComponent],
  imports: [DialogModule],
  exports: [ BreadcrumbComponent],
})
export class ComponentsModule {}
