import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url="https://docfeeback.hop.sh";

  constructor(public snackBar: MatSnackBar,  private http: HttpClient) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top'
  }

  success(msg: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  warn(msg: string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config)
  }

  guardarToken(token:any):Observable<any>{
    return this.http.post<any>(this.url+"/notificaciones/guardar",token,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

}
