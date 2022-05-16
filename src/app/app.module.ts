import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { AgGridModule } from 'ag-grid-angular';
import { ImageFormatterComponent } from './components/image-formatter/image-formatter.component';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';


MatToolbarModule;
@NgModule({
  declarations: [AppComponent, ToolbarComponent, CarouselComponent, HomeComponent, CartComponent, ProductCardComponent, ProductDetailsComponent, ImageFormatterComponent, ButtonRendererComponent],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
