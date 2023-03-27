import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientComponent } from '../patients/patient/patient.component';
import { CitasService } from 'src/app/services/citas.service';
import { Citas } from 'src/app/_models/citas';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  sesion:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);
  selected: Date | null;
  citas: Citas[];
  dataSource: MatTableDataSource<Citas>
  displayedColumns: string[] = ['fecha','hora','especialidad','lugar'];


  constructor(public dialog: MatDialog,
    private citasService: CitasService
    ) { }

  ngOnInit(): void {
    this.mostrarCitas(this.sesion.id);
    
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

  mostrarCitas(id:string){
    this.citasService.buscarPorIdMedico(id).subscribe(data =>{
      this.citas = data
      console.log(this.citas)
      this.dataSource = new MatTableDataSource(data);
    })
  }

}
