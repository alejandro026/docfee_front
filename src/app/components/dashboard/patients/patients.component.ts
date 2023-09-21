import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/interfaces/paciente'
import { PacienteService } from 'src/app/services/paciente.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { PatientComponent } from './patient/patient.component';
import { HistoryComponent } from './history/history.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(
    public pacienteService: PacienteService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
  ) { }

  listData: Paciente[]= [];
  searchKey: string;
  displayedColumns: string[] = ['nombre', 'edad', 'correo', 'telefono', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getData();
    this.pacienteService.getPacienteEdit().subscribe(data => {
      console.log(data);
    })
  }

  getData() {
    this.pacienteService.getPaciente().subscribe(doc => {
      this.listData = [];
      doc.forEach((element: any) => {
        this.listData.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      })

    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    if (this.searchKey == "") {
      this.ngOnInit();
    } else {
      this.listData = this.listData.filter(res => {
        return res.nombre.toLowerCase().match(this.searchKey.toLowerCase());
      })
    }
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

  onDelete(id: string) {
    this.pacienteService.deletePaciente(id).then(() => {
      this.notificationService.warn('Historial eliminado')
    }, error => {
      console.log(error);
    })
  }

  onView(paciente: Paciente) {
    const dialogRef = this.dialog.open(HistoryComponent, {
      // width: "100%",
      // height: "90%",
      disableClose: false,
      autoFocus: true,
    });
    this.pacienteService.addPacienteEdit(paciente);
  }

  onEdit(paciente: Paciente) {
    const dialogRef = this.dialog.open(PatientComponent, {
      // width: "100%",
      // height: "90%",
      disableClose: false,
      autoFocus: true,
    });
    this.pacienteService.addPacienteEdit(paciente);
    this.pacienteService.getPacienteData(paciente)
  }

}
