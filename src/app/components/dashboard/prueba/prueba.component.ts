import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Antecedentes } from './../../../_models/antecedentes';
import { AgregarComponent } from './agregar/agregar.component';

import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './../../../_models/usuario';
import { NotificationService } from './../../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
import { GenerarAntecedenteComponent } from './generar-antecedente/generar-antecedente.component';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    private storage: Storage
  ) { }

  searchKey: string;
  displayedColumns: string[] = ['nombre', 'apPaterno', 'apMaterno', 'nss', 'telefono', 'antecedente', 'actions'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.getData();
    this.dataSource = new MatTableDataSource<Usuario>();
    this.getArchivos();
  }

  ngAfterViewChecked(): void {
    this.cambiarPaginacion();
  }

  getData() {
    this.usuarioService.consultarTodos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  //Metodo para subir archivos a firebase
  subirArchivo($event: any){
    const file = $event.target.files[0];

    console.log("subirArchivo ~ file", file)

    const fileRef = ref(this.storage, "archivos/"+file.name);

    uploadBytes(fileRef, file).then(resposne=>{
      console.log(resposne);

    }).catch(error=>{
      console.log(error);
    })

  }

  getArchivos(){
    //Se crea una referncia hacia el stroge de firebase
    const fileRef = ref(this.storage, "archivos/")

    //Para obtener los archivos que hay en firebase se hace lo sgiente
    //Obtiene un array en que se guarada los archivos que hay.
    list(fileRef).then(response=>{
      console.log(response);

      //Aqui lo que se hace es una busqueda con la refencia que se guarado en la base de datos
      //Nota cambiar la cadena por lo que se guarada en la base de datos.
      let result = response.items.find(({ fullPath }) => fullPath == "archivos/UML_JTY.pdf");

    //Para obtener la refencia el link con el que se puede acceder hay que utilizar el metodo.
      //
      getDownloadURL(result!).then(url=>{
        console.log("getDownloadURL ~ url", url);
      });

    }).catch(error=>{
      console.log(error)
    })
  }

  openModal(usuario?: Usuario) {
    let usuario2= new Usuario();
    let antecedentes:Antecedentes[]=[];
    antecedentes.push(new Antecedentes());

    usuario2.id_UsuarioConfianza= new Usuario();
    // usuario2.antecedentes=antecedentes;


    let user = usuario != null ? usuario : usuario2;
    const modalRef = this.dialog.open(AgregarComponent, {
      width: '1000px',
      data: user,
    });
    modalRef.afterClosed().subscribe(result=>{
        this.getData();
    })
  }


  openModal2(idUsuario: number) {
    const modalRef = this.dialog.open(GenerarAntecedenteComponent, {
      width: "45%",
      minWidth: "250px",
      data: idUsuario,
    });
    modalRef.afterClosed().subscribe(result=>{
        this.getData();
    })
  }

  cambiarPaginacion(){
    Util.cambiarIdiomaPaginacion(this.paginator);
  }

}
