import { Usuario } from './../../_models/usuario';
import { UsuarioService } from './../../services/usuario.service';
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

  nombre:FormControl;
  apPaterno:FormControl;
  apMaterno:FormControl;
  numTelefono: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  recaptcha: FormControl;

  registerForm: FormGroup;
  disableRegisterButton: boolean;
  failedRegister: boolean;
  failedRegisterMessage: string;
  @ViewChild('emailInput') emailInput?: ElementRef;
  @ViewChild('passwordInput') passwordInput?: ElementRef;

  key: string="6LcQ1nUlAAAAAJUtvvqI6GKFLJ3OzC17k9ddGCx1";


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
      public ref: DynamicDialogRef, public config: DynamicDialogConfig,
      private usuarioService: UsuarioService

  ) {
      this.nombre = new FormControl('',  [ Validators.required]);
      this.apPaterno = new FormControl('',  [ Validators.required]);
      this.apMaterno = new FormControl('',  [ Validators.required]);
      this.numTelefono= new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]);
      this.emailControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]);
      this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
      this.recaptcha = new FormControl('');
      this.registerForm = new FormGroup({
          nombre: this.nombre,
          apPaterno: this.apPaterno,
          apMaterno: this.apMaterno,
          numTelefono: this.numTelefono,
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
          this.nombre.disable();
          this.apPaterno.disable();
          this.apMaterno.disable();
          this.recaptcha.disable();
          this.disableRegisterButton = true;

          await this.authService.createUser(this.emailControl.value, this.passwordControl.value);
          // this.router.navigate(['app/tasks']);
          Util.succesMessajeNormal('Se ha enviado un correo de confirmación.');


          let usuarioBack:Usuario=new Usuario();;
          usuarioBack.nombre=this.nombre.value;
          usuarioBack.apPaterno=this.apPaterno.value;
          usuarioBack.apMaterno=this.apMaterno.value;
          usuarioBack.correo=this.emailControl.value;
          usuarioBack.usuario=this.emailControl.value;
          usuarioBack.telefono= this.numTelefono.value;

          console.log(usuarioBack);
          this.usuarioService.guardarUsuario(usuarioBack).subscribe(data=> {
            console.log(data);
            this.cerrarDialog();
          })

          // this.authService.sendVerificationMail();
      } catch (error: any) {

        this.failedRegister = true;
          this.emailControl.enable();
          this.passwordControl.enable();
          this.nombre.enable();
          this.apPaterno.enable();
          this.apMaterno.enable();
          this.recaptcha.enable();
          this.disableRegisterButton = true;

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
