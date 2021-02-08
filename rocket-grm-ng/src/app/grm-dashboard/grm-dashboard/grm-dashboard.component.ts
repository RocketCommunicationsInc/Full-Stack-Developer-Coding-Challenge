import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Alerts} from '../../models/Alerts';
import {SatelliteContacts} from '../../models/SatelliteContacts';

@Component({
  selector: 'app-grm-dashboard',
  templateUrl: './grm-dashboard.component.html',
  styleUrls: ['./grm-dashboard.component.scss']
})
export class GrmDashboardComponent implements OnInit {

  alerts: Observable<Alerts[]>;
  contacts: Observable<SatelliteContacts[]>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit (): void {
    this.alerts = this.dataService.getAlerts();
    this.contacts = this.dataService.getContacts();
  }

}
