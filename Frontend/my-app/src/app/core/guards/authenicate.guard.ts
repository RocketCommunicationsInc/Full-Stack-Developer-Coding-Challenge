import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthenicateGuard implements CanActivate {
  constructor(private loginService: LoginService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isAuthenticated) {
        return true;
      } 

      return this.router.parseUrl('/login');
  }
  
}
