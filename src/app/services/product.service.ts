import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product.interface';
import { products } from '../../const';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public prodcutsListSubject = new BehaviorSubject<Product[]>(null);
  prodcuts$ = this.prodcutsListSubject.asObservable();

  constructor() {
    this.prodcutsListSubject.next(products);
  }

  
}
