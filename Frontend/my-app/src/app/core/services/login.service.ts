import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isAuthenticated: boolean = false;

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post(`${environment.baseUrl}/login`, user)
      .pipe(map(response => response['result']),
            tap(result => {
              if (result == 'Ok') {
                this.isAuthenticated = true;
              } else {
                this.isAuthenticated = false;
              }
            }));
  }

  createUser(user: User)  {
     return this.httpClient.post(`${environment.baseUrl}/create`, user)
        .pipe(map(response => response['result']));
  }
}
