import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expired-dialog-component',
  templateUrl: './session-expired-dialog-component.component.html',
  styleUrls: ['./session-expired-dialog-component.component.css']
})
export class SessionExpiredDialogComponentComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SessionExpiredDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sessionDuration: number }
  ) {}
  ngOnInit(): void {
  }



  onRenew() {
    // Cerrar el diálogo y renovar la sesión
    this.dialogRef.close(true);
  }

  onClose() {
    // Cerrar el diálogo y cerrar la sesión
    this.dialogRef.close(false);
  }
}
