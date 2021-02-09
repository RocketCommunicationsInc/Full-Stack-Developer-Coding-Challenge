import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Alerts} from '../../../models/Alerts';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsComponent implements OnInit {
  @Input() alerts: Observable<Alerts[]>;

  columnDefs = [
    { field: 'errorCategory', sortable: true, width: 150},
    { field: 'errorMessage', width:320, resizable: true },
    { field: 'errorTime', width: 255 }
  ];

  rowData: any[] = [];

  constructor (private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit (): void {
    this.alerts
      .subscribe( (alerts: Alerts[]) => {
        this.rowData = alerts.map(({errorMessage, errorCategory, errorTime}) => ({
          errorMessage,
          errorCategory,
          errorTime: new Date(errorTime).toISOString()
        }));
        this.changeDetectorRef.markForCheck();
        console.log('row Data: ', this.rowData)
      });
  }

}
