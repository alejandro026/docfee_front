import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientComponent } from '../patients/patient/patient.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', './custom-theme.scss']
})
export class HomepageComponent {
  

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onCreate() {
    const dialogRef = this.dialog.open(PatientComponent, {
      width: "100%",
      height: "90%",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('')
    })
  }

}
