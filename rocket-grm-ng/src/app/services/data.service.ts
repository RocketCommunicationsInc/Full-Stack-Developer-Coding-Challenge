import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getAlerts (): Observable<any> {
    return this.http.get(`${environment.apiUrl}alerts`);
  }

  getContacts (): Observable<any> {
    return this.http.get(`${environment.apiUrl}satellite_contacts`);
  }
}
