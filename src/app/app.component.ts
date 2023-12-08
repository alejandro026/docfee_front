import { Component, HostListener } from '@angular/core';
import { InactivityService } from './services/inactivity.service';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';
import { ConnectionServiceModule } from 'ng-connection-service';
import { DbPwaService } from './services/db-pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DOCFEE';

  //Llave publica para las notificaciones push
  public readonly VALID_PUBLIC_KEY="BNbKdoGiuuGcZzadTU6KPxfKXgqvaIQs7bKkchFA9T9UM1oJEukHJeKqkUNDHZKRDqdeC5mEUDVObu9_A-YNh6U";

  constructor(
    private inactivityService: InactivityService,
    private swPush: SwPush,
    private notificacionService: NotificationService,
    private dbPwaService: DbPwaService
    ) {
      this.suscribeToNotifications();
    }

  suscribeToNotifications():any{
    this.swPush.requestSubscription({
      serverPublicKey: this.VALID_PUBLIC_KEY
    }).then(sub =>{
      const token = JSON.parse(JSON.stringify(sub));
      console.log("El token");
      console.log(token);
      this.notificacionService.guardarToken(token).subscribe((data:any)=>{
        console.log("Se guardo el token");
      });
    }).catch(error=>{
      //En caso de que no acepte las notificaciones
      console.log("UPS :( "+error);
    })
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  onActivity(event: MouseEvent) {
    this.inactivityService.activityDetected();
  }
}

