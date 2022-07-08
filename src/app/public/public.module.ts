import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/components/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageFormatterComponent } from './components/image-formatter/image-formatter.component';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';

import { AgGridModule } from 'ag-grid-angular';

import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { SendEmailComponent } from './pages/auth/send-email/send-email.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

//FORMLY
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

function EmailValidator(control: FormControl): ValidationErrors {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)
    ? null
    : { email: true };
}

function EmailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid Email Address`;
}

function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value;

  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}
//end FORMLY

const my_components = [
  CarouselComponent,
  HomeComponent,
  CartComponent,
  ProductCardComponent,
  ProductDetailsComponent,
  LoginComponent,
  RegisterComponent,
  SendEmailComponent,
  ImageFormatterComponent,
  ButtonRendererComponent,
];

@NgModule({
  declarations: [...my_components],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validators: [
        { name: 'email', validation: EmailValidator },
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],
      validationMessages: [{ name: 'email', message: EmailValidatorMessage }],
    }),
  ],
})
export class PublicModule {}
