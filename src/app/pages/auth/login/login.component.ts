import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { loginGoogle, loginUser } from 'src/app/reducers/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('home');
      }
    });
  }

  form = new FormGroup({});
  model = { email: 'email@gmail.com', password: '******' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
      validators: {
        validation: ['email'],
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
        minLength: 6,
      },
    },
  ];

  public onSubmit(model) {
    if (this.form.valid) {
      this.onLogin();
    }
  }

  public async onGoogleLogin() {
    await this.store.dispatch(loginGoogle())
  }

  public forgotPass() {
    this.authSvc.resetPassword(this.form.get('email').value);
    this.router.navigateByUrl('home');
  }

  async onLogin() {
    const { email, password } = this.form.value;
    if (this.form.valid) {
      await this.store.dispatch(loginUser({ email, password }));
    }
  }

}
