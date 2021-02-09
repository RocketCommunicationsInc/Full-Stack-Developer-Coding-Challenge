import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

interface UserInfo {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authenticated: Subject<boolean> = new BehaviorSubject(false);
  get authenticated (): Observable<boolean> { return this._authenticated.asObservable(); }

  private _user: UserInfo;
  get user (): UserInfo {
    return this._user;
  }
  constructor (
    private http: HttpClient,
    private router: Router
  ) { }

  // function to work with the routing module. Will allow/disallow navigation to specified routes
  // in the app-routing.module.ts file based on logging in successfully or not.
  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenticated.pipe(tap( activate => {
      if (!activate) {
        this.router.navigate(['login']);
      }
    }));
  }

  authenticate (uname: string, pass: string): any {
    const filterObj = {
      where: {
        userName: uname,
        password: pass
      },
      fields: {
        firstName: true,
        lastName: true
      }
    };
    // creation of the mongodb query filter as an encoded query string
    const filter = encodeURIComponent(JSON.stringify(filterObj));
    return this.http.get(`${environment.apiUrl}/users?filter=${filter}`)
      .pipe(tap((resp: UserInfo) => {
        if (Object.entries(resp).length > 0) {
          this._authenticated.next(true);
          this._user = resp;
        }
      }));
  }

  registerUser (user: User): any {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }
}
