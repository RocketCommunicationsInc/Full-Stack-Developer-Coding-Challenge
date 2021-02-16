import { Component, OnInit, ChangeDetectorRef,  ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../core';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup = new FormGroup({
    loginEmail: new FormControl(''),
    loginPassword: new FormControl(''),
  });
  isValid: boolean = true;

  constructor(private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCreateAccountClicked() {
    this.router.navigate(['./create']);
  }

  onSubmitLoginInfo() {
    this.isValid = this.loginInfo.controls['loginEmail'].value && this.loginInfo.controls['loginPassword'].value;
    if (this.isValid) {
      this.loginService.login({
        email: this.loginInfo.controls['loginEmail'].value,
        password: this.loginInfo.controls['loginPassword'].value,
      })
    }
    this.cdr.detectChanges();
  }

}
