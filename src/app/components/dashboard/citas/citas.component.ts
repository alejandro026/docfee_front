import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Citas } from './../../../_models/citas';
import { CitasService } from './../../../services/citas.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Citas>;
  displayedColumns: string[] = ['Cita', 'Medico', 'Fecha', 'Lugar', 'Especialidad', 'Notas'];


  constructor(
    private CitasService: CitasService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Citas>();
    this.route.queryParams.subscribe( params => {
      this.buscarPorIdTratamiento(params.idTratmiento);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // consultarTodos(){
  //   this.CitasService.consultarTodos().subscribe(data=>{
  //     this.dataSource= new MatTableDataSource(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;

  //     console.log("this.CitasService.consultarTodos ~ this.dataSource=", this.dataSource)

  //   })
  // }

  buscarPorIdTratamiento(id:number){
    this.CitasService.buscarPorId(id).subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
