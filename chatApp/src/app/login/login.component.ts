import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../servives/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMsg: string = '';
  loader:boolean=false

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  Loginform = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]], //validations in Angular.
    pswd: ['', [Validators.required, Validators.pattern('[0-9A-Za-z]*')]],
  });

  logindata() {
    if (this.Loginform.valid) {
      let acno = this.Loginform.value.acno;
      let pswd = this.Loginform.value.pswd;
      console.log(acno);
      this.api.login(acno, pswd).subscribe(
        (result: any) => {
          this.loader = true
          console.log(result);
          localStorage.setItem('username', result.username);
          //save account number;
          localStorage.setItem('phone', JSON.stringify(result.phone));

          //token

          localStorage.setItem('token', result.token);

          setTimeout(() => {
            this.loader = false
            
            this.router.navigateByUrl('chat');
          }, 2000);
        },

        (data: any) => {
          this.errorMsg = data.error.message;
          console.log(this.errorMsg);
        }
      );
    } else {
      alert('invalid');
    }
  }
}
