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
  displayedColumns2: string[] = ['Cita', 'Medico', 'Fecha', 'Lugar', 'Especialidad', 'Notas', 'Estatus', 'Receta','nuevaReceta', 'Acciones'];
  displayedColumns3: string[] = ['Cita', 'Medico', 'Fecha', 'Lugar', 'Especialidad', 'Notas', 'Estatus', 'Receta',];

  _idAntecedente:number;

  _id:number;

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
        this._id=parseInt(params.idTratmiento);
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
      console.log(data);
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


  verReceta(id:number, estatus:number){
    if(estatus==1||estatus==0){
      Util.errorMessajeNormal("La cita aun no ha sido atendida");
      return;
    }
    if(estatus==3){
      Util.errorMessajeNormal("La cita fue cancelada");
      return;
    }
    this.router.navigate(['/dashboard/receta'], { queryParams: { id_receta: id} });
  }
  nuevaReceta(id:number, idMedico:string, estatus:number){
    console.log(estatus);

    if(this.sesion.id!=idMedico){
      Util.errorMessajeNormal("No puedes atender esta cita")
      return;
    }
    if(estatus==2){
      Util.errorMessajeNormal("La cita ya fue atendida");
      return;
    }

    if(estatus==3){
      Util.errorMessajeNormal("La cita fue cancelada");
      return;
    }

    this.router.navigate(['/dashboard/nuevaReceta'], { queryParams: { id_cita: id} });
  }

  veficaConfirmacion(estatus:number){
    if(estatus==1){
      return "Confirmada";
    }
    if(estatus==0){
      return "Sin confirmar"
    }
    if(estatus==2){
      return "Atendida";
    }else{
      return "Cancelada";
    }
  }


  nuevaCitaUsuario(id:number){
    console.log(this.dataSource.data.length=0);
    console.log(this._idAntecedente)
    if(this._idAntecedente==undefined||this._idAntecedente==null){
      Util.errorMessajeNormal("Solicita la creación de tu expediente para agendar citas.")
      return;
    }
    this.router.navigate(['/dashboard/nuevaCitaUsuario'], { queryParams: { idTratmiento: id} });
  }

  cambiarEstatus(idCita:number, idMedico:string, estatus:number, ){
    if(this.sesion.id!=idMedico){
      Util.errorMessajeNormal("No puedes atender esta cita")
      return;
    }

    if(estatus==1){
      //ONFIRMAR
      this.CitasService.actualizaEstatus(idCita, 1).subscribe(data=>{
        console.log(data);
        Util.succesMessajeNormal("Cita confirmada con éxito");
        setTimeout(()=>{
          location.reload()
        }, 300)
        // this.consultarTodosVista(this._id);
      });
    }else{
      this.CitasService.actualizaEstatus(idCita, 3).subscribe(data=>{
        console.log(data);
        Util.succesMessajeNormal("Cita cancelada con éxito");
        setTimeout(()=>{
          location.reload()
        }, 300)
        // this.consultarTodosVista(this._id);

      });
      //Cancelar
    }
  }


}
