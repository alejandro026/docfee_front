import { RegistroComponent } from './components/registro/registro.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HammerModule } from "@angular/platform-browser";
import { IgxCalendarModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { PatientComponent } from './components/dashboard/patients/patient/patient.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NavbarloginComponent } from './components/navbarlogin/navbarlogin.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { Page404Component } from './components/page404/page404.component';

import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { CargarScriptService } from './services/cargar-script.service';
import { MapaSitioComponent } from './components/mapa-sitio/mapa-sitio.component';


import { NgxCaptchaModule } from 'ngx-captcha';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';
              //api
// import { UserIdleModule } from 'angular-user-idle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NumericDirective } from './numeric.directive';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from './interceptor/LoaderInterceptor';

interface NgxSpinnerConfig {
  type?: string;
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarloginComponent,
        FooterComponent,
        LoginFormComponent,
        Page404Component,
        MapaSitioComponent,
        ResetPasswordComponent,
        RegistroComponent,
        NumericDirective
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        LayoutModule,
        HammerModule,
        IgxCalendarModule,
        HttpClientModule,
        NgxDropzoneModule,
        PdfViewerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        DateTimePickerModule,
        MaterialModule,
        MdbCarouselModule,
        NgxCaptchaModule,
        MdbCollapseModule,
        ButtonModule,
        DynamicDialogModule,
        DialogModule,
        ToastModule,
        TableModule,
        AccordionModule,
        DialogModule,
        MatProgressBarModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
        // UserIdleModule.forRoot({ timeout: 10, idle: 15 })

    ],
    providers: [
        CargarScriptService,
        DialogService,
        DialogModule,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
