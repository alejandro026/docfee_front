import { DocumentoUpdate } from './../../../_models/DocumentoUpdate';
import { TratamientoService } from './../../../services/tratamiento.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './../../../_models/usuario';
import { NotificationService } from './../../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  archivos:any[]=[];
  usuario:number;

  doc = "https://firebasestorage.googleapis.com/v0/b/docfee-c3a33.appspot.com/o/archivos%2FUML_JTY.pdf?alt=media&token=9cd4ac1c-a5b0-4dea-88cf-42b5bdf2c029";

  constructor(
    public usuarioService: UsuarioService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    private storage: Storage,
    private tratamientoService: TratamientoService
  ) { }

  searchKey: string;
  displayedColumns: string[] = ['nombre', 'apPaterno', 'apMaterno', 'nss', 'telefono'];
  // dataSource: MatTableDataSource<Usuario>;
  datosCombo:Usuario[];


  ngOnInit() {
    this.getData();
    // this.dataSource = new MatTableDataSource<Usuario>();
    this.getArchivos();

  }

  getData() {
    this.usuarioService.consultarTodos().subscribe(data => {
      this.datosCombo= data;
      // this.dataSource = new MatTableDataSource(data);
      console.log(data)
    })
  }


  //Metodo para subir archivos a firebase
  subirArchivo($event: any){

    if(this.usuario==null){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debes seleccionar un usuario',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }

    const file = $event.addedFiles[0];
    const fileRef = ref(this.storage, "archivos/"+this.usuario+"/"+file.name);

    uploadBytes(fileRef, file).then(resposne=>{
      let documento:DocumentoUpdate= new DocumentoUpdate();
      documento.ruta="archivos/"+this.usuario+"/";
      documento.id=this.usuario;

      this.tratamientoService.actualizarDocumento(documento).subscribe(data=>{
        console.log("this.tratamientoService.actualizarDocumento ~ resposne", resposne)
      })


      console.log(resposne);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Archivo subido con exito',
        showConfirmButton: false,
        timer: 1500
      })
      this.getArchivos()

    }).catch(error=>{
      console.log(error);
    })

  }

  getArchivos(){
    //Se crea una referncia hacia el stroge de firebase
    const fileRef = ref(this.storage, "archivos/"+this.usuario)

    //Para obtener los archivos que hay en firebase se hace lo sgiente
    //Obtiene un array en que se guarada los archivos que hay.
    list(fileRef).then(response=>{
      console.log(response);

      //Aqui lo que se hace es una busqueda con la refencia que se guarado en la base de datos
      //Nota cambiar la cadena por lo que se guarada en la base de datos.

      this.tratamientoService.buscarPorUsuario(this.usuario).subscribe(data=>{
        // let result = response.items.find(({ fullPath }) => fullPath == data.documentosEstudios);
        // let result = response.items.find(({ fullPath }) => fullPath == data[0].documentosEstudios);
        // console.log(result)
        console.log(data);
        response.items.forEach(data=>{
          getDownloadURL(data).then(url=>{
            this.archivos.push({
              "url":url,
              "nombre": data.name
            });
            console.log("getDownloadURL ~ url", url);
          });
        });

      })


    //Para obtener la refencia el link con el que se puede acceder hay que utilizar el metodo.
      // //
      // response.items.forEach(data=>{
        // getDownloadURL(result!).then(url=>{
        //   this.archivos.push(url);
        //   console.log("getDownloadURL ~ url", url);
        // });
      // })


    }).catch(error=>{
      console.log(error)
    })
  }

}
