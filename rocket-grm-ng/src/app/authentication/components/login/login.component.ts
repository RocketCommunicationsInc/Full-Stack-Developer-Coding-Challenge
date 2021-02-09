import '@astrouxds/rux-button/rux-button';
import '@astrouxds/rux-notification/rux-notification.js';

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../authentication.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('usernameInput') usernameInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  get form (): { [c: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }
  userLoginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  loginError: boolean = false;
  formSubmitted: boolean = false
  errorMessage: string;
  loading: boolean = false;

  constructor (
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  // This is a bit of hackey solution. Usually my best strategy is utilizing an OAuth or OIDC provider
  // such as Keycloak. Use solid authentication/authorization instead of always recreating the wheel.
  submitLogin (): void {
    this.formSubmitted = true;
    this.usernameInput.nativeElement.disabled = true;
    this.passwordInput.nativeElement.disabled = true;
    this.authService.authenticate(this.form.userName.value, this.form.password.value)
      .pipe(take(1))
      .subscribe(
        resp => {
          if (resp.length > 0) {
            this.router.navigate(['/dashboard']);
          } else {
            this.formSubmitted = false;
            this.usernameInput.nativeElement.disabled = false;
            this.passwordInput.nativeElement.disabled = false;
            this.loginError = true;
            this.errorMessage = 'Invalid credentials. Please try again.';
          }
        }
      );
  }

}
