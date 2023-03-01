import { MatDialogRef } from '@angular/material/dialog';
import { Util } from 'src/app/utils/util';
import { AuthService } from './../../services/AuthService.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  emailFormControl: FormControl;
    failedResetPassword: boolean;
    failedResetPasswordMessage: string;
    passwordResetEmailSended: boolean;
    disableSendButton: boolean;
    @ViewChild('emailInput') emailInput?: ElementRef;

    constructor(private authService: AuthService,
      public dialogRef: MatDialogRef<ResetPasswordComponent>) {
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
        ]);
        this.failedResetPassword = false;
        this.failedResetPasswordMessage = '';
        this.disableSendButton = false;
        this.passwordResetEmailSended = false;
    }

    async sendResetPasswordEmail() {
        if (this.emailFormControl.invalid) {
            this.emailFormControl.markAsDirty();
            this.emailInput?.nativeElement.focus();
            return;
        }
        this.passwordResetEmailSended = false;
        this.failedResetPassword = false;
        this.emailFormControl.disable();
        this.disableSendButton = true;

        try {
            await this.authService.sendResetPasswordEmail(this.emailFormControl.value);
            this.passwordResetEmailSended = true;
            this.emailFormControl.enable();
            this.disableSendButton = false;

            Util.succesaMessage('Se han enviado las intrucciones a tu correo');

            this.cerrarDialog();

        } catch (error: any) {

            console.log("sendResetPasswordEmail ~ error:", error.code)

            this.emailFormControl.enable();
            this.disableSendButton = false;
            this.failedResetPassword = true;

            this.failedResetPasswordMessage = 'Ocurrio un problema al enviar el correo. Intenta nuevamente';
            this.passwordResetEmailSended = false;
            if (error?.code === 'auth/user-not-found') {
                this.failedResetPasswordMessage = 'No hay ninguna cuenta asociada a ese correo. Verifica el correo e intenta nuevamente';

                console.log("sendResetPasswordEmail ~ this.failedResetPasswordMessage:", this.failedResetPasswordMessage)
                console.log("sendResetPasswordEmail ~ this.failedResetPasswordMessage:", this.failedResetPassword)

            }

        }

    }

    cerrarDialog(){
      this.dialogRef.close({data:0});
      // this.hide=true;
    }

}
