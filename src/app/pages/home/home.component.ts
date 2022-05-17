import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.interface';
import { User } from 'src/app/models/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsList: Product[] = [];
  public user$: Observable<User> = this.authService.afAuth.user;
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.prodcuts$.subscribe((res) => {
      this.productsList = res;
    });
  }
}
