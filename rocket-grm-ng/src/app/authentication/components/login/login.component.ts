import '@astrouxds/rux-button/rux-button';

import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../authentication.scss']
})
export class LoginComponent implements OnInit {

  get form (): { [c: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }
  userLoginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  formSubmitted: boolean = false;
  loading: boolean = false;

  constructor (
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit (): void {
  }

  submitLogin (): void {
    console.log('form: ', this.form);
    this.authService.authenticate(this.form.userName.value, this.form.password.value)
      .subscribe(result => {
        console.log('Authentication result: ', result);
      });
  }

}
