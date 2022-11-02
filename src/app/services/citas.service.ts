import { Citas } from './../_models/citas';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CitasService {

   url="http://localhost:8083/citas/";

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
}
