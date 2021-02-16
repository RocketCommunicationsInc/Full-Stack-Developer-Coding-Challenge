import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { ContactDashboard } from 'src/app/core/models/ContactDashboard';
import { Contact, DataGridColumn, DataService } from '../../core';

@Component({
  selector: 'my-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
  contactColumns: DataGridColumn[] = [];
  contactDashboard: ContactDashboard = null;
  sortCategoryByAsc: boolean = null;

  constructor(private cdr: ChangeDetectorRef,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getContacts()
      .subscribe(contactDashboard => {
        this.contactDashboard = contactDashboard;
        this.contactColumns = [
          {
            property: 'contactName',
            caption: 'Name',
            canSort: true,
          },
          {
            property: 'contactStatus',
            caption: 'Status',
          },
          {
            caption: 'Begin/End',
            property: 'contactBeginTimestamp',
            displayValue: (contact: Contact) => `${moment(contact.contactBeginTimestamp).format('L LT')} - ${moment(contact.contactEndTimestamp).format('L LT')}`,
          },
        ]
        this.cdr.detectChanges();
      });
  }

}
