import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/Product.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

const MY_CART = 'myCart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private prodcutsSubject = new BehaviorSubject<Product[]>(null);
  prodcuts$ = this.prodcutsSubject.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.initialStorage();
  }

  public async saveOrder(order: any): Promise<any> {
    try {
      this.firestore.collection('Orders').add(order);
      this._snackBar.open('Order send!', 'Close', {
        duration: 3000,
      });
      this.router.navigateByUrl('home')
      return 
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  public addOrRemoveCart(product: Product): void {
    const { id } = product;
    const prods = this.getProductsCart();
    const found = !!prods.find((fav: Product) => fav.id === id);
    found ? this.removeFromCart(id) : this.addToCart(product);
  }

  private addToCart(prodcuts: Product): void {
    try {
      const prods = this.getProductsCart();
      localStorage.setItem(MY_CART, JSON.stringify([...prods, prodcuts]));
      this.prodcutsSubject.next([...prods, prodcuts]);
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
      const prods = this.getProductsCart();
      const prodcuts = prods.filter((item) => item.id !== id);
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
      const prods = JSON.parse(localStorage.getItem(MY_CART));
      this.prodcutsSubject.next(prods);
      return prods;
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
