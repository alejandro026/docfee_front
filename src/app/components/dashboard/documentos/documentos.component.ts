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

  archivos:String[]=[];

  doc = "https://firebasestorage.googleapis.com/v0/b/docfee-c3a33.appspot.com/o/archivos%2FUML_JTY.pdf?alt=media&token=9cd4ac1c-a5b0-4dea-88cf-42b5bdf2c029";

  constructor(
    public usuarioService: UsuarioService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    private storage: Storage
  ) { }

  searchKey: string;
  displayedColumns: string[] = ['nombre', 'apPaterno', 'apMaterno', 'nss', 'telefono'];
  dataSource: MatTableDataSource<Usuario>;


  ngOnInit() {
    this.getData();
    this.dataSource = new MatTableDataSource<Usuario>();
    this.getArchivos();

  }

  getData() {
    this.usuarioService.consultarTodos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)
    })
  }


  //Metodo para subir archivos a firebase
  subirArchivo($event: any){

    console.log("subirArchivo ~ $event", $event)

    // const file = $event.target.files[0];
    const file = $event.addedFiles[0];

    console.log("subirArchivo ~ file", file)

    const fileRef = ref(this.storage, "archivos/"+file.name);

    uploadBytes(fileRef, file).then(resposne=>{
      console.log(resposne);
      this.getArchivos()

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
      // //
      response.items.forEach(data=>{
        getDownloadURL(data!).then(url=>{
          this.archivos.push(url);
          console.log("getDownloadURL ~ url", url);
        });
      })


    }).catch(error=>{
      console.log(error)
    })
  }

}
