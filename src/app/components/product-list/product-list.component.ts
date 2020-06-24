import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from 'rxjs';
import { Product } from '../../Models/product.model';
import { ShoppingCartService } from '../../Services/shopping-cart.service';
import { add, total, list, get, exists, quantity } from 'cart-localstorage'
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;
  isCollapsed: boolean;
  type: string = "";
  token: string = "hhh";
  id: string = "";
  fName: string = ""


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
    fName: string
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
  /////////////////////////
  @Input('shopping-cart') shoppingCart



  getQuantity(product: any) {
    // console.log(product.id)
    if (exists(product.id)) {
      this.shoppingCart = get(product.id).quantity
      return this.shoppingCart
    } else {
      this.shoppingCart = 0
      return this.shoppingCart
    }
  }


}
