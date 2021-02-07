import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rocket-grm-ng';
  apiResponse: Observable<any>;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.apiResponse = this.http.get(`${environment.apiUrl}/alerts`);
  }
}
