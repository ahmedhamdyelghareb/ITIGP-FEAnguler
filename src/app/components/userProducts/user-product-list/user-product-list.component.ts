import { Component, OnInit, Input } from '@angular/core';
import { add, total, list, get, exists ,quantity } from 'cart-localstorage'
import { ProductService } from 'src/app/Services/product.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-product-list',
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.css']
})
export class UserProductListComponent implements OnInit {

  products;
  isCollapsed: boolean;
  type: string = "";
  token: string = "hhh";
  id: string = "";
  fName:string=""

 
  constructor(private productService: ProductService,
    private modalService: NgbModal,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.authToken();
    return this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      console.log(this.products)

      // this.products=this.products.map(function (el) {
      //   var o = Object.assign({}, el);
      //   o.isCollapsed = true;
      //   return o;
      // })
      // console.log(this.products)
    }
    )
   
  }
  getToken() {
    if (typeof this.token !== "undefined" && this.token !== null)
      return this.token;
    else alert("invalid username or password");
  }
  getType() {
    if (typeof this.type !== "undefined" && this.type !== null)
      return this.type;
    else console.log(this.type);
  }


  currentUser: {
    token: string;
    id: string;
    Type: string;
    fName:string
  };

  authToken() {
    if (
      typeof localStorage.getItem("currentUser") !== "undefined" &&
      localStorage.getItem("currentUser") !== null
    ) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (
        typeof this.currentUser.token !== "undefined" &&
        this.currentUser.token !== null
      ) {
        this.token = this.currentUser.token;
        this.id = this.currentUser.id;
        this.type = this.currentUser.Type;
        this.fName = this.currentUser.fName
      }
      return true;
    } else {
      return false;
    }
  }


/////////////////////////
@Input('shopping-cart') shoppingCart



carts
addToCart(product: any) {

    add({ id: product.id, name: product.title, price: product.price })
    this.carts = list().length
    console.log(this.carts)
    this.getQuantity(product)
 
}

getQuantity(product: any) {
  console.log(product.id)
  if (exists(product.id)) {
    this.shoppingCart = get(product.id).quantity
    return this.shoppingCart
  }else{
    this.shoppingCart = 0
    return this.shoppingCart
  }

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
}
