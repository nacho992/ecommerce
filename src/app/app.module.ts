import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CarouselComponent } from './public/components/carousel/carousel.component';
import { HomeComponent } from './public/pages/home/home.component';
import { CartComponent } from './public/pages/cart/cart.component';
import { ProductCardComponent } from './public/components/product-card/product-card.component';
import { ProductDetailsComponent } from './public/pages/product-details/product-details.component';

import { AgGridModule } from 'ag-grid-angular';
import { ImageFormatterComponent } from './public/components/image-formatter/image-formatter.component';
import { ButtonRendererComponent } from './public/components/button-renderer/button-renderer.component';
import { LoginComponent } from './public/pages/auth/login/login.component';
import { RegisterComponent } from './public/pages/auth/register/register.component';

import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SendEmailComponent } from './public/pages/auth/send-email/send-email.component';
import { StoreModule } from '@ngrx/store';
import { REDUCERS } from "./reducers/app.state";
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from "./reducers/effects/auth.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from '@angular/common/http';


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

MatToolbarModule;
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CarouselComponent,
    HomeComponent,
    CartComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ImageFormatterComponent,
    ButtonRendererComponent,
    LoginComponent,
    RegisterComponent,
    SendEmailComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    AgGridModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validators: [
        { name: 'email', validation: EmailValidator },
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],

      validationMessages: [{ name: 'email', message: EmailValidatorMessage }],
    }),
    FormlyMaterialModule,
    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ name: "test redux" }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
