import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrmDashboardComponent } from './components/grm-dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ContactsComponent } from './components/contacts/contacts.component';
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
