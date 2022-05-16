import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  count: number = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.prodcuts$.subscribe(res => {
      this.count = res.length
    })
  }

}
