import { Injectable, inject } from "@angular/core";
import { Usuario } from "../_models/usuario";
import Swal from "sweetalert2";
import { UsuarioService } from "./usuario.service";
// const PouchDB = require('pouchdb-browser');
// const pouchDB = PouchDB.default.defaults();

declare const PouchDB: any;

@Injectable({
  providedIn: 'root'
})

export class DbPwaService{
  [x: string]: any;
  private db:any;
  constructor(private usuarioService: UsuarioService){
    //Creando base de datos en navegador
    this.db = new PouchDB('MyDB');
  }
  //Guardar datos en el navegador
  public addTask(dataScheme: Usuario){
    console.log('✖️ no tiene conexión a internet')
    this.db.get(dataScheme.telefono)
      .then((doc:any)=>{
        console.log('[LOCAL]: Encontrado y Actualizado');
        //delete dataScheme.telefono;
        doc = Object.assign(doc,dataScheme);
        this.db.post(doc);
      }).catch(()=>{
        this.db.post(dataScheme);
        console.log('[LOCAL]: Se crea nuevo registro local')
      });
  }
  public updateTask(data: Usuario) {
    return this.db.get(data.telefono)
      .then((doc: any) => {
        // Ya existe, actualizar
        Swal.fire({
          heightAuto: false,
          icon: 'warning',
          title: "No tienes conexión a internet. El registro fue guardado de forma local y se sincronizará en cuando tu conexión se reestablezca",
          showConfirmButton: false,
          timer: 2500
        });
        return this.db.remove(doc)
          .then(() => {
            return this.db.post(data);
          });
      })
      .catch(() => {
        // No existe, crear nuevo
        return this.db.post(data);
      });

  }
// Obtener todos los registros locales
public async getAll() {

  let docs: Usuario[] = [];

  await this.db.allDocs({
    include_docs: true
  }).then((result: { rows: { map: (arg0: (row: any) => any) => never[]; }; }) => {
    docs = result.rows.map(row => row.doc);
  });

  return docs;

}

// Enviar registros a API y luego borrar local
public async syncAndClear() {

  const docs = await this.getAll();

  // enviar docs a API
  docs.forEach((e) => {
    // this.usuarioService.guardarUsuario(e)
    //   .toPromise();


    this.usuarioService.guardarUsuario(e).subscribe(data=> {
        console.log(data);
        Swal.fire({
          heightAuto: false,
          icon: 'success',
          title: "Guardado con exito",
          showConfirmButton: false,
          timer: 2500
        });
        this.db.remove(e);
      },
      ()=>{
        console.log("No hay internet :(!");
        this.dbPwaService.updateTask(e);
        this.db.remove(e);
      }
      )

    })


}
}
