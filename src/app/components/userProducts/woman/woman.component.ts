import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { add, total, list, get, exists ,quantity } from 'cart-localstorage'


@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.css']
})
export class WomanComponent implements OnInit {
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
    return this.productService.getProductBycategory("women").subscribe(res=>{
      this.products=res;
  })

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
closeResult = "";
openLogin(contentLogin) {
  this.modalService
    .open(contentLogin, { ariaLabelledBy: "modal-basic-title" })
    .result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReasonLogin(reason)}`;
      }
    );
}

private getDismissReasonLogin(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return "by pressing ESC";
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return "by clicking on a backdrop";
  } else {
    return `with: ${reason}`;
  }
}

////////////////////
@Input('shopping-cart') shoppingCart
// ngOnInit() {
//   this.getProduct()
// }


carts
addToCart(product: any) {
  add({ id: product.id, name: product.title, price: product.price })
  this.carts = list().length
  console.log(this.carts)
  // this.shoppingCart = get(product._id).quantity
  // console.log(this.shoppingCart)
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

