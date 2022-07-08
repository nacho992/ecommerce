import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private prodcutsListSubject = new BehaviorSubject<any[]>(null);
  public prodcuts$ = this.prodcutsListSubject.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {
    this.getProducts();
  }

  public async getProducts(): Promise<any> {
    try {
      await this.firestore.collection('products').get().subscribe(res => {
        var data = res.docs.map(doc => doc.data());
        this.getProductsAPI().subscribe(res => {
          data = [...data, ...res];
          this.prodcutsListSubject.next(data)
        },err => {})
        this.prodcutsListSubject.next(data)
        return data
      });
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  private getProductsAPI(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}`)
  }

}
