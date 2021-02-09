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
    { field: 'contactName', sortable: true, width: 150 },
    { field: 'contactStatus', width: 155 },
    { field: 'contactBeginTimestamp', width: 250 },
    { field: 'contactEndTimestamp',  width: 250}
  ];

  rowData: any[] = [];

  constructor () { }

  ngOnInit (): void {
    this.contacts
      .subscribe( (contacts: SatelliteContacts[]) => {
        this.totalSatContacts = contacts.length;
        // using Lodash groupby to get me the contact states in an easier countable data structure.
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
            // unix time to milliseconds so that we can show a human readable date.
            contactBeginTimestamp: new Date(contactBeginTimestamp * 1000).toISOString(),
            contactEndTimestamp: new Date(contactEndTimestamp * 1000).toISOString()
          }));
      });
  }

}
