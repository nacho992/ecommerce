import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/Product.interface';
const MY_CART = 'myCart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private prodcutsSubject = new BehaviorSubject<Product[]>(null);
  prodcuts$ = this.prodcutsSubject.asObservable();

  constructor(private _snackBar: MatSnackBar) {
    this.initialStorage();
  }

  addOrRemoveCart(product: Product): void {
    const { id } = product;
    const currentsFav = this.getProductsCart();
    const found = !!currentsFav.find((fav: Product) => fav.id === id);
    found ? this.removeFromCart(id) : this.addToCart(product);
  }

  private addToCart(prodcuts: Product): void {
    try {
      const currentsFav = this.getProductsCart();
      localStorage.setItem(MY_CART, JSON.stringify([...currentsFav, prodcuts]));
      this.prodcutsSubject.next([...currentsFav, prodcuts]);
      this._snackBar.open('Added to cart!', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  private removeFromCart(id: number): void {
    try {
      const currentsFav = this.getProductsCart();
      const prodcuts = currentsFav.filter((item) => item.id !== id);
      localStorage.setItem(MY_CART, JSON.stringify([...prodcuts]));
      this.prodcutsSubject.next([...prodcuts]);
      this._snackBar.open('Deleted to cart!', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  getProductsCart(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_CART));
      this.prodcutsSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  private initialStorage(): void {
    localStorage.setItem(MY_CART, JSON.stringify([]));
    this.prodcutsSubject.next([]);
  }
}
