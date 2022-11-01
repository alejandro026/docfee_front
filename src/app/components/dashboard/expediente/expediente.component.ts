import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VistaTratamiento } from './../../../_models/vistaTratatamiento';
import { TratamientoService } from './../../../services/tratamiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<VistaTratamiento>;
  displayedColumns: string[] = ['id_tratamiento', 'id_usuario', 'nombre_paciente', 'descipcion', 'aspectos_generales', 'diagnostico_presuntivo'];


  constructor(
    private tratamientoService: TratamientoService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<VistaTratamiento>();
    this.consultarTodosVista();

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  consultarTodosVista(){
    this.tratamientoService.consultarTodosVista().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log("this.tratamientoService.consultarTodosVista ~ this.dataSource=", this.dataSource)


      console.log("this.tratamientoService.consultarTodos ~ data", data)

    })
  }

}
