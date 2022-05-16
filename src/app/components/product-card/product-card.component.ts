import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  constructor(private cartService: CartService) { }

  @Input() product: Product

  public addCart(){
    const inCart = this.product.inCart;
    this.product.inCart = !inCart;
    this.cartService.addOrRemoveCart(this.product)
  }

  public getNameButton(): string {
    return this.product.inCart ? 'In Cart' : 'Add Cart';
  }

}
