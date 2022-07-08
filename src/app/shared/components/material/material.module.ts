import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

const material_components = [
  MatFormFieldModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCardModule,
  MatBadgeModule,
  MatIconModule,
  MatToolbarModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule, material_components],
  exports: [material_components],
})
export class MaterialModule {}
