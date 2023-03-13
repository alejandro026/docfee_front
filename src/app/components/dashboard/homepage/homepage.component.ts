import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientComponent } from '../patients/patient/patient.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  sesion:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);
  selected: Date | null;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onCreate() {
    const dialogRef = this.dialog.open(PatientComponent, {
      // width: "100%",
      // height: "90%",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('')
    })
  }

}
