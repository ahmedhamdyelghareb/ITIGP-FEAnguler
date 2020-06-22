import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../Services/shopping-cart.service';
import { Product } from 'src/app/models/product.model';
import { add, total, list, get, exists ,quantity ,destroy} from 'cart-localstorage'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private shoppinCartSer:ShoppingCartService,public route: ActivatedRoute, private router: Router) { }
  cart:[]
  productsID:any[] = []
  product:any
  productID:any
  cartQuantity = 0
  totalPrice = 0
  @Input('shopping-cart') shoppingCart
  products: any[]
  id
   ngOnInit() {
    this.cart = list()
    for(var i = 0 ; i<this.cart.length ; i++)
    {
      this.product = this.cart[i]
        this.productID = this.product.id
        this.productsID.push(this.productID)
       
    }
    // console.log(this.productsID)
    this.cartQuantity =this.shoppinCartSer.getCart()
 
    // console.log(this.cartQuantity)
  }

  addToCart(product: any) {
    add({ id: product.id, name: product.title, price: product.price })
    this.getQuantity(product)
  }

  getQuantity(product: any) {

    if (exists(product.id)){
      // console.log(product.id)
      this.shoppingCart = get(product.id).quantity 
      return this.shoppingCart
    }else{
      // console.log(product._id)
      this.shoppingCart = 0   
      return this.shoppingCart
    }

  }
  getTotalPrice(){
    return total()
  }
  removeFromCart(product: any){
    if (exists(product.id)) {
      this.shoppingCart = quantity(product.id,-1)
      return this.shoppingCart
    }else{
      this.shoppingCart = 0
      return this.shoppingCart
    }
  }
  ClearShoppingCart(){
    if (!confirm('are you sure you want to your cart !!')) return;   
   this.cart = destroy()
   this.router.navigate(["/allProducts"])
  }
  ordersList(){
    if(list().length === 0){
      alert("your cart is empty !!!")
      this.router.navigate(['/product'])
    }
      this.shoppinCartSer.getProductsList(this.productsID)
    
  }  
 
}
