import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../models';
import { ContactDashboard } from '../models/ContactDashboard';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { groupBy, size } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAlerts(): Observable<Alert[]> {
    return this.httpClient.get(`${environment.baseUrl}/alerts`)
      .pipe(map(response => response['results']))
  }

  getContacts(): Observable<ContactDashboard> {
    return this.httpClient.get(`${environment.baseUrl}/contacts`)
      .pipe(map(response => {
        return {
          totalStates: size(groupBy(response['results'], 'contactState')),
          contacts: response['results'],
        }
      }))
  }
}
