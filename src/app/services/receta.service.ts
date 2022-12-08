import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Recetas } from '../_models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

 url="http://localhost:8083/receta/";

Recetas= new Recetas();
 constructor(
   private http: HttpClient
 ) { }

 consultarTodos():Observable<Recetas[]>{

   return this.http.get<Recetas[]>(this.url+"consultarTodos",
     {headers: new HttpHeaders().append("Content-Type", "application/json")});
 }
 buscarPorId(id:number): Observable<Recetas>{
  return this.http.get<Recetas>(this.url+"buscarPorId/"+id,
  {headers: new HttpHeaders().append("Content-Type", "application/json")});
}

buscarPorIdCita(id:number): Observable<Recetas>{
  return this.http.get<Recetas>(this.url+"buscarPorIdCita/"+id,
  {headers: new HttpHeaders().append("Content-Type", "application/json")});
}

consultarPorID(id_receta:number): Observable<Recetas> {
  const url = "http://localhost:8083/receta/buscarPorId/" +  id_receta

  return this.http.get<Recetas>(url);
}
consultarPorIDCita(id_cita:number): Observable<Recetas> {
  const url = "http://localhost:8083/receta/buscarPorIdCita/" +  id_cita

  return this.http.get<Recetas>(url);
}
// consultarMateriaPorID(idMateria): Observable<Response<Materia>> {
//   const url = "http://localhost:8081/materia/consultarMateriaPorID/" +  idMateria

//   return this.http.get<Response<Materia>>(url);
// }

}