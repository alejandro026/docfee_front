import { AuthService } from './services/AuthService.service';
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("------------------------------->",this.auth.validaSesion())
      if(!this.auth.validaSesion()){
        return this.router.navigate(['/login']).then(() => false);
      }
    return true;
  }

}
