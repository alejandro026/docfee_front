import { RegistroComponent } from './components/registro/registro.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { NgParticlesModule } from 'ng-particles';
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
import { HttpClientModule } from '@angular/common/http';
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

import { NgxCaptchaModule } from 'ngx-captcha';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarloginComponent,
        FooterComponent,
        LoginFormComponent,
        Page404Component,
        ResetPasswordComponent,
        RegistroComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        NgParticlesModule,
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
        MdbCollapseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
