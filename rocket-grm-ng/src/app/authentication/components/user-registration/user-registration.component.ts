import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['../../authentication.scss']
})
export class UserRegistrationComponent implements OnInit {
  get form (): { [c: string]: AbstractControl } {
    return this.userRegistrationForm.controls;
  }
  userRegistrationForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  formSubmitted: boolean = false;
  loading: boolean = false;

  constructor (
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  cancelRegistration (): void {
    this.router.navigate(['login']);
  }

  submitRegistration (): void {
    const regUser: User = {
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      userName: this.form.userName.value,
      password: this.form.password.value
    };

    this.authService.registerUser(regUser)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['login']);
        }
      });
  }
}
