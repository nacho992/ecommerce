import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ButtonRendererComponent } from 'src/app/components/button-renderer/button-renderer.component';
import { ImageFormatterComponent } from 'src/app/components/image-formatter/image-formatter.component';
import { User } from 'src/app/models/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'name', sortable: true },
    { field: 'description' },
    { field: 'price', sortable: true },
    {
      field: 'img',
      autoHeight: true,
      cellRenderer: ImageFormatterComponent,
    },
    { field: 'count', editable: true },
    {
      headerName: 'Delete',
      cellRenderer: ButtonRendererComponent,
      cellRendererParams: {
        onClick: this.onDeleteButtonClick.bind(this),
        label: 'Delete',
      },
    },
  ];

  shipping: number = 5;
  rowData = [];
  public user$: Observable<User> = this.authService.afAuth.user;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.prodcuts$.subscribe((res) => {
      this.rowData = res;
    });
  }

  public onDeleteButtonClick(params) {
    this.upDateProductsList(params.data.id)
    this.cartService.addOrRemoveCart(params.data);
    this.rowData = this.rowData.filter((p) => p.id !== params.data.id);
  }

  private upDateProductsList(id){
    this.productService.prodcuts$.subscribe(res => {
      res
      .filter((prod) => prod.id == id)
      .forEach((p) => (p.inCart = false));
    })
  }

  public getSubtotal(): number {
    return this.rowData
      .map((prod) => prod.price * prod.count)
      .reduce((prev, curr) => prev + curr, 0);
  }

  public onCellValueChanged(event: any) {
    this.getSubtotal();
  }

  public sendOrder() {
    this.user$.subscribe((res) => {
      if (res) {
        const cart = {
          listProducts: this.rowData,
          completed: false,
          cart_id: res.email,
          totalMount: this.getSubtotal() + this.shipping
        };
        this.cartService.saveOrder(cart);
      } else {
        this.router.navigateByUrl('login');
      }
    });
  }
}
