import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/reducers/actions/auth.actions';
import { AppState } from 'src/app/reducers/app.state';
import { selectUserData } from "src/app/reducers/selector/auth.selectors";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  user$: Observable<any>;
  isLogged: boolean
  count: number = 0;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>

  ) {
    this.user$ = this.store.select(selectUserData);
    this.user$.subscribe(res => {            
      if(res != undefined){
        this.isLogged = true;
      }
    })
  }

  ngOnInit(): void {
    this.cartService.prodcuts$.subscribe((res) => {
      this.count = res.length;
    });
  }

  public async onLogout() {
    await this.store.dispatch(logOut())
  }
}
