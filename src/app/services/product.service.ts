import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private prodcutsListSubject = new BehaviorSubject<any[]>(null);
  public prodcuts$ = this.prodcutsListSubject.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore
  ) {
    this.getProducts();
  }

  public async getProducts(): Promise<any> {
    try {
      this.firestore.collection('products').get().subscribe(res => {
        const data = res.docs.map(doc => doc.data());
        this.prodcutsListSubject.next(data)
        return data
      });
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

}
