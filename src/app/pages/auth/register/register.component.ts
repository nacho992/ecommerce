import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { User } from 'src/app/models/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { registerUser } from 'src/app/reducers/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
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
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },

      fieldGroup: [
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
            placeholder: 'Must be at least 3 characters',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        },
      ],
    },
  ];

  async submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.store.dispatch(registerUser({ email, password }));
    }
  }
}
