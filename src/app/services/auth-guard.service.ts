import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(protected router:Router) {
  }
  //if there is no auth key we need to login
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("User auth key: "+localStorage.getItem('auth'))
    if (localStorage.getItem('auth'))
      return true;
    else {
      console.log("Auth guard: redirect to LOGIN")
      return this.router.navigate(['/login']);
    }
  }

}
