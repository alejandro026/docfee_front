import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Citas } from './../../../_models/citas';
import { CitasService } from './../../../services/citas.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sesion:LoginUsuario;

  dataSource: MatTableDataSource<Citas>;
  displayedColumns: string[];
  displayedColumns2: string[] = ['Cita', 'Medico', 'Fecha', 'Lugar', 'Especialidad', 'Notas', 'Estatus', 'Receta','nuevaReceta'];
  displayedColumns3: string[] = ['Cita', 'Medico', 'Fecha', 'Lugar', 'Especialidad', 'Notas', 'Estatus', 'Receta',];

  _idAntecedente:number;

  constructor(
    private CitasService: CitasService,
    private route:ActivatedRoute,
    private router:Router,
    private tratamientoService: TratamientoService
  ) { }

  ngOnInit(): void {
    this.sesion=JSON.parse(sessionStorage.getItem('sesion')!);
    this.dataSource = new MatTableDataSource<Citas>();
  }
  ngAfterViewInit(): void {
    this.cambiarPaginacion()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.sesion.tipoUsuario=="MEDICO"){
      this.displayedColumns=this.displayedColumns2;
    }else{
      this.displayedColumns=this.displayedColumns3;
    }

    this.route.queryParams.subscribe( params => {
      if(Object.keys(params).length !== 0){
        this.buscarPorIdTratamiento(params.idTratmiento);
      }else{
        var id = parseInt(this.sesion.id);
        this.consultarTodosVista(id);
      }
    });


  }

  cambiarPaginacion(){
    Util.cambiarIdiomaPaginacion(this.paginator);
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

  consultarTodosVista(id:number){
    this.tratamientoService.consultarTodosVista(id).subscribe(data=>{
      let idTratmiento=data[0].id_tratamiento!;
      this._idAntecedente=idTratmiento;
      this.buscarPorIdTratamiento(idTratmiento)
      console.log(data);
    })
  }


  verReceta(id:number){
    this.router.navigate(['/dashboard/receta'], { queryParams: { id_receta: id} });
  }
  nuevaReceta(id:number){
    this.router.navigate(['/dashboard/nuevaReceta'], { queryParams: { id_cita: id} });
  }

  veficaConfirmacion(estatus:boolean){
    if(estatus){
      return "Confirmada";
    }else{
      return "Sin confirmar"
    }
  }


  nuevaCitaUsuario(id:number){
    this.router.navigate(['/dashboard/nuevaCitaUsuario'], { queryParams: { idTratmiento: id} });
  }


}
