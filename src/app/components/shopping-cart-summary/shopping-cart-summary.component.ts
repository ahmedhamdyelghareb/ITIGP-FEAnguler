import { Component, OnInit } from '@angular/core';
import {  list , total} from 'cart-localstorage'
import { ShoppingCartService } from '../../Services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }
  cartList = list()
  TotalPrice = this.cartService.getTotalPrice()
  quantity = this.cartService.getCart()

}
