import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Citas } from './../../../_models/citas';
import { CitasService } from './../../../services/citas.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoginUsuario } from 'src/app/_models/loginUsuario';

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


  constructor(
    private CitasService: CitasService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.sesion=JSON.parse(sessionStorage.getItem('sesion')!);
    this.dataSource = new MatTableDataSource<Citas>();
    this.route.queryParams.subscribe( params => {
      this.buscarPorIdTratamiento(params.idTratmiento);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.sesion.tipoUsuario=="MEDICO"){
      this.displayedColumns=this.displayedColumns2;
    }else{
      this.displayedColumns=this.displayedColumns3;
    }
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
}
