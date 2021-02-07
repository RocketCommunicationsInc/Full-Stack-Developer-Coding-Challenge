import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (
    private http: HttpClient
  ) { }

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
    const filter = encodeURIComponent(JSON.stringify(filterObj));
    return this.http.get(`${environment.apiUrl}/users?filter=${filter}`);
  }

  registerUser (user: User): any {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }
}
