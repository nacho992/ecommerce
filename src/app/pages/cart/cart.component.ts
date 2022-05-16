import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ButtonRendererComponent } from 'src/app/components/button-renderer/button-renderer.component';
import { ImageFormatterComponent } from 'src/app/components/image-formatter/image-formatter.component';
import { CartService } from 'src/app/services/cart.service';
import { products } from '../../../const';
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

  rowData = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.prodcuts$.subscribe((res) => {
      this.rowData = res;
    });
  }

  public onDeleteButtonClick(params) {
    products
      .filter((prod) => prod.id == params.data.id)
      .forEach((p) => (p.inCart = false));
    this.cartService.addOrRemoveCart(params.data);
    this.rowData = this.rowData.filter((p) => p.id !== params.data.id);
  }

  public getSubtotal(): number{
    return this.rowData.map(prod => prod.price * prod.count).reduce((prev, curr) => prev + curr, 0);
  }

  public onCellValueChanged(event: any){
    this.getSubtotal();
  }
}
