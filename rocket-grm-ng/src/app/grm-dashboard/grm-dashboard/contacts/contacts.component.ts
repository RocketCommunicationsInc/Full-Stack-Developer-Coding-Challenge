import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SatelliteContacts} from '../../../models/SatelliteContacts';
import {groupBy} from 'lodash-es';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() contacts: Observable<SatelliteContacts[]>;

  totalSatContacts: number = 0;
  totalDiffStates: number = 0;
  columnDefs = [
    { field: 'contactName', sortable: true },
    { field: 'contactStatus' },
    { field: 'contactBeginTimestamp' },
    { field: 'contactEndTimestamp' }
  ];

  rowData: any[] = [];

  constructor () { }

  ngOnInit (): void {
    this.contacts
      .subscribe( (contacts: SatelliteContacts[]) => {
        console.log('contact states: ', groupBy(contacts, 'contactState'));
        this.totalSatContacts = contacts.length;
        this.totalDiffStates = Object.keys(groupBy(contacts, 'contactState')).length;
        this.rowData = contacts.map(
          ({
             contactName,
             contactStatus,
             contactBeginTimestamp,
             contactEndTimestamp
           }) => ({
            contactName,
            contactStatus,
            contactBeginTimestamp,
            contactEndTimestamp
          }));
      });
  }

}
