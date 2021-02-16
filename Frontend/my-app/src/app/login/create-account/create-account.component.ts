import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core';

@Component({
  selector: 'my-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss', '../login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountComponent implements OnInit {
  bAccountCreationSuccess: boolean = false;
  loginInfo: FormGroup = new FormGroup({
    loginEmail: new FormControl(''),
    loginPassword: new FormControl(''),
  });
  isValid: boolean = true;
  createAccountError: string = null;

  constructor(private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitLoginInfo() {
    this.isValid = this.loginInfo.controls['loginEmail'].value && this.loginInfo.controls['loginPassword'].value;
    if (this.isValid) {
      this.loginService.createUser({
        email: this.loginInfo.controls['loginEmail'].value,
        password: this.loginInfo.controls['loginPassword'].value,
      }).subscribe(response => {
        if (response == 'Ok') {
          this.bAccountCreationSuccess = true;
          this.createAccountError = null;
        } else {
          this.bAccountCreationSuccess = false;
          this.createAccountError = response;
        }
        this.cdr.detectChanges();
      });
    } else {
      this.cdr.detectChanges();
    }
  }

  onLoginClicked() {
    this.router.navigate(['./login']);
  }

}
