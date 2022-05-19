import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { selectUserName } from 'src/app/reducers/selector/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.state';
import { User } from 'src/app/models/User.interface';

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
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    //this.user$ = this.store.select(selectUserName);
    this.user$ = this.authService.afAuth.user;
  }

  ngOnInit(): void {
    this.productService.prodcuts$.subscribe((res) => {
      this.productsList = res;
    });
  }
}
