import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

import  SweetAlert  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sh:SharedService , private _router:Router){}
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.sh.my_checkAuth())

      if(!this.sh.my_checkAuth()){
        this._router.navigateByUrl('/login')
         SweetAlert.fire("You Need to login" , "You need to be logged in",'info')
        return false
      }else{

        return true
      }
  }

}
