import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  list , total} from 'cart-localstorage'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private myHttp:HttpClient) { }
  productList : []
  productQuantity=0
  product:any 
  productListIDs
  getCart(){
    this.productList = list() 
    for(var i =0; i < this.productList.length ;  i++){
      this.product = this.productList[i]
      this.productQuantity += this.product.quantity 
    }
    // console.log(this.productQuantity)
    return this.productQuantity
  }
  getTotalPrice(){
    return total()
  }
  getProductsList(productsID:any){
    this.productListIDs = productsID
  }
  returnProductList(){
    return this.productListIDs
  }
}
