import { NgModule } from "@angular/core";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { Page404Component } from './page404/page404.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [BreadcrumbComponent, Page404Component],
  imports: [],
  exports: [ BreadcrumbComponent],
})
export class ComponentsModule {}
