import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isAuthenticated: boolean = false;
  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
    this._isAuthenticated$.next(this._isAuthenticated);
  }

  get isAuthenticated$() {
    return this._isAuthenticated$.asObservable();
  }

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(user: User) {
    this.httpClient.post(`${environment.baseUrl}/login`, user)
      .subscribe(response => {
        this.isAuthenticated = true;
        this.router.navigate(['./dashboard']);
      });
  }

  createUser(user: User)  {
     return this.httpClient.post(`${environment.baseUrl}/create`, user);
  }
}
