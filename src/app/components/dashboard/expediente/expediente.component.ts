import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { Router } from '@angular/router';
import { Tratamiento } from './../../../_models/tratamiento';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VistaTratamiento } from './../../../_models/vistaTratatamiento';
import { TratamientoService } from './../../../services/tratamiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from 'inspector';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<VistaTratamiento>;
  displayedColumns: string[] = [ 'nombre_paciente', 'descipcion', 'aspectos_generales', 'diagnostico_presuntivo', 'acciones','nueva_cita'];

  columnsToDisplayWithExpand = [this.displayedColumns, 'expand'];
  expandedElement: Tratamiento | null;

  sesion:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);


  constructor(
    private tratamientoService: TratamientoService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<VistaTratamiento>();

    this.sesion=JSON.parse(sessionStorage.getItem('sesion')!);
    var id = parseInt(this.sesion.id);
    if(this.sesion.tipoUsuario=="PACIENTE"){
      this.consultarTodosVista(id);
    }else{
      this.consultarTodosVistaDR();
    }


  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cambiarPaginacion();
  }

  cambiarPaginacion(){
    Util.cambiarIdiomaPaginacion(this.paginator);
  }
  consultarTodosVistaDR(){
    this.tratamientoService.consultarTodosVistaDR().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log("this.tratamientoService.consultarTodosVista ~ this.dataSource=", this.dataSource)


      console.log("this.tratamientoService.consultarTodos ~ data", data)

    })
  }

  consultarTodosVista(id:number){
    this.tratamientoService.consultarTodosVista(id).subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  consultarTodosVistaId(){
    this.tratamientoService.consultarTodosVistaIdUsuario(this.sesion.id).subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  verDetalles(id:number){
    this.router.navigate(['/dashboard/detalleExpedinete'], { queryParams: { idTratmiento: id} });
  }

  verCitas(id:number){
    this.router.navigate(['/dashboard/citas'], { queryParams: { idTratmiento: id} });
  }
  nuevaCita(id:number){
    this.router.navigate(['/dashboard/nuevaCita'], { queryParams: { idTratmiento: id} });
  }
  nuevaCitaUsuario(id:number){
    this.router.navigate(['/dashboard/nuevaCitaUsuario'], { queryParams: { idTratmiento: id} });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
