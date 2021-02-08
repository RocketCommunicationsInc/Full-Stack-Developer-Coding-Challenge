import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from './authentication/authentication.module';
import {GrmDashboardModule} from './grm-dashboard/grm-dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    GrmDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
