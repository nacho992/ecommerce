import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product.interface';
import { CartService } from 'src/app/services/cart.service';
import { products } from "../../../const";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product

  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe( (params) => {
      const id = params['id'];
      this.product = products.filter(p => p.id == id).pop()
    } )
  }

  public addCart(){
    const inCart = this.product.inCart;
    this.product.inCart = !inCart;
    this.cartService.addOrRemoveCart(this.product)
  }

  public getNameButton(): string {
    return this.product.inCart ? 'In Cart' : 'Add to Cart';
  }
}
