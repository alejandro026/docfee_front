import { Paciente } from './../interfaces/paciente';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(
    private http: HttpClient
  ) { }

  consultarTodos():Observable<Response<Alumno>>{
    let url="http://localhost:8081/alumno/consultarTodos";
    return this.http.get<Response<Alumno>>(url,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  borrar(id:number){
    let url="http://localhost:8081/alumno/borrarAlumnoPorID/";
    return this.http.delete<Response<number>>(`${url}/${id}`,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  guardar(materia: Paciente){
    let url= "http://localhost:8081/alumno/guardarAlumno"
    return this.http.post<Paciente>(url,
      materia,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  actualizar(materia: AlumnoRequest){
    let url= "http://localhost:8081/alumno/actualizarAlumno"
    return this.http.put<Response<Alumno>>(url,
      materia,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  // consultaDinamica(alumnoFiltroRequest: AlumnoFitroRequest):Observable<Response<Alumno>>{
  //   let url="http://localhost:8081/alumno/buscarAlumnoDinamica"
  //   return this.http.post<Response<Alumno>>(url,
  //     alumnoFiltroRequest,
  //     {headers: new HttpHeaders().append("Content-Type", "application/json")});
  // }

}
