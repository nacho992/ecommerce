import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/pages/auth/login/login.component';
import { RegisterComponent } from './public/pages/auth/register/register.component';
import { SendEmailComponent } from './public/pages/auth/send-email/send-email.component';
import { CartComponent } from './public/pages/cart/cart.component';
import { HomeComponent } from './public/pages/home/home.component';
import { ProductDetailsComponent } from './public/pages/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',

  },
  {
    path: 'verification-email',
    component: SendEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
