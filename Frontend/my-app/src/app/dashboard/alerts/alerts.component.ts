import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Alert, DataGridColumn } from 'src/app/core/models';
import { DataService } from '../../core';

@Component({
  selector: 'my-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];
  alertColumns: DataGridColumn[] = [];
  sortCategoryByAsc: boolean = null;

  constructor(private cdr: ChangeDetectorRef,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAlerts()
      .subscribe(alerts => {
        this.alerts = alerts;
        this.alertColumns = [
          {
            property: 'errorMessage',
            caption: 'Message',
          },
          {
            property: 'errorCategory',
            caption: 'Category',
            canSort: true,
          },
          {
            property: 'errorTime',
            caption: 'Time',
            datatype: 'datetime', // optional type 
          },
        ]
        this.cdr.detectChanges();
      });
  }

}
