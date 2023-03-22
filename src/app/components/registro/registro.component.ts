import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Util } from 'src/app/utils/util';
import { ReCaptcha2Component } from 'ngx-captcha';
import { Router } from '@angular/router';
import { AuthService } from './../../services/AuthService.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  emailControl: FormControl;
  passwordControl: FormControl;
  recaptcha: FormControl;

  registerForm: FormGroup;
  disableRegisterButton: boolean;
  failedRegister: boolean;
  failedRegisterMessage: string;
  @ViewChild('emailInput') emailInput?: ElementRef;
  @ViewChild('passwordInput') passwordInput?: ElementRef;

  key: string="6Lfznr8kAAAAAJ5mxeuPpjSbuGcGAQ-zt3vBWvf7";


  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;

  failedLogin: boolean;
  failedLoginMessage: string;
  disableLoginButton: boolean;


  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'es';
  public type: 'image' | 'audio';

  constructor(
      private authService: AuthService,
      // public dialogRef: MatDialogRef<RegistroComponent>,
      public ref: DynamicDialogRef, public config: DynamicDialogConfig

  ) {
      this.emailControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]);
      this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
      this.recaptcha = new FormControl('',  [ Validators.required]);
      this.registerForm = new FormGroup({
          email: this.emailControl,
          password: this.passwordControl,
          recaptcha: this.recaptcha
      });
      this.disableRegisterButton = false;
      this.failedRegister = false;
      this.failedRegisterMessage = 'Problema al registrar usuario';
  }

  async register() {
      if (this.registerForm.invalid) {
          this.emailControl.markAsDirty();
          this.passwordControl.markAsDirty();
          if (this.passwordControl.invalid) {
              this.passwordInput?.nativeElement.focus();
          }

          if (this.emailControl.invalid) {
              this.emailInput?.nativeElement.focus();
          }
          return;
      };

      try {
          this.failedRegister = false;
          this.emailControl.disable();
          this.passwordControl.disable();
          this.disableRegisterButton = true;

          await this.authService.createUser(this.emailControl.value, this.passwordControl.value);
          // this.router.navigate(['app/tasks']);
          Util.succesaMessage('Se ha enviado un correo de confirmación.');
          this.cerrarDialog();
          // this.authService.sendVerificationMail();
      } catch (error: any) {
          this.failedRegister = true;
          this.failedRegisterMessage = 'Problema al registrar usuario';
          if (error?.code === 'auth/email-already-exists') {
              this.failedRegisterMessage = 'Ya existe una cuenta con el mismo correo';
          }
      }

  }

  cerrarDialog(){
    this.ref.close({data:0});
    // this.hide=true;
  }

  handleSuccess(data:any) {
    console.log(data);
  }

}
