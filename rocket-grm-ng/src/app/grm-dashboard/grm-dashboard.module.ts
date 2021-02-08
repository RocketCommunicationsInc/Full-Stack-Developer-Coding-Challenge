import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrmDashboardComponent } from './grm-dashboard/grm-dashboard.component';
import { AlertsComponent } from './grm-dashboard/alerts/alerts.component';
import { ContactsComponent } from './grm-dashboard/contacts/contacts.component';
import {FormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';



@NgModule({
  declarations: [
    GrmDashboardComponent,
    AlertsComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([])
  ]
})
export class GrmDashboardModule { }
