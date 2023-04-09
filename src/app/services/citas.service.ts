import { CitaDTO } from './../_models/citaDTO';
import { Citas } from './../_models/citas';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CitasService {

   url="https://docfeeback-production.up.railway.app/citas/";

  constructor(
    private http: HttpClient
  ) { }

  consultarTodos():Observable<Citas[]>{

    return this.http.get<Citas[]>(this.url+"consultarTodos",
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  buscarPorId(id:number): Observable<Citas[]>{
    return this.http.get<Citas[]>(this.url+"buscarPorId/"+id,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  buscarPorIdMedico(id:string): Observable<Citas[]>{
    return this.http.get<Citas[]>(this.url+"buscarPorIdMedico/"+id,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  actualizarCita(cita:Citas):Observable<Citas>{
    return this.http.put<Citas>(this.url+"actualizar",cita,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  guardarCita(cita:CitaDTO):Observable<Citas>{
    return this.http.post<Citas>(this.url+"guardar",cita,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
}
