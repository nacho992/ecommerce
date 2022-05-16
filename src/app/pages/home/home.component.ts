import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsList: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.prodcuts$.subscribe((res) => {
      this.productsList = res;
    });
  }
}
