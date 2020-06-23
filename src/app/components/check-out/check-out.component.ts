import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  NgModel
} from "@angular/forms";
import { ShoppingCartService } from "../../Services/shopping-cart.service";
import { OrderService } from "../../Services/order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { list, total } from "cart-localstorage";
import { ProductService } from "../../Services/product.service";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"]
})
export class CheckOutComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private OrderService: OrderService,
    public route: ActivatedRoute,
    private router: Router
  ) {}
  productList;
  IDs: any;
  arrayId: any[] = [];
  productsId: string;

  quantity: any;
  arrayQuanties: any[] = [];
  quantaties: string;

  productOwner: any;
  productOwnerArray: any[] = [];
  productOwners: string;
  product: {
    userId: "";
  };

  ID: number = 0;
  ownerId: number = 0;
  owners: string = "";

  ngOnInit() { 
   // console.log(this.getProductsOwnersIds())
  }
  ownersString:string
  //////////////////////////
  getProductById(id) {
    this.productService.getOwnerById(id).subscribe(res => {
      // console.log(res);
      this.ownerId = res.prod;
      console.log(this.ownerId[0].userId);
      this.productOwnerArray.push(this.ownerId[0].userId);
      this.owners += this.ownerId[0].userId + '-'
      // this.ownersString = this.owners
    //  console.log(this.ownersString);
     
      //console.log( `${ this.productOwnerArray.pop()}jjjjjjj`)
    });
  }

  getProductsOwnersIds() {
    this.productList = list();
    console.log(this.productList);
    for (var i = 0; i < this.productList.length; i++) {
      this.ID = this.productList[i].id;
      this.getProductById(this.ID);
      console.log(this.productOwnerArray[i]);
    }
    return  this.owners
  }

 

  getuserID() {
    const { id } = JSON.parse(localStorage.getItem("currentUser"));
    return id;
  }

  myDate = new Date();
  shipping = {
    sourceAddress: "",
    destinationAddress: "",
    // amount : "",
    arrivalTime: "",
    totalPrice: ""
    // productOwnerID : "",
    // userId : ""
  };
  order = {
    sourceAddress: "",
    destinationAddress: "",
    amount: "",
    arrivalTime: new Date(),
    totalPrice: 0,
    productOwnerID: "",
    userId: 0,
    productId: ""
  };
  getProductsID() {
    // const {id} = JSON.parse(localStorage.getItem("_cart"))
    // console.log(id)
    this.productList = list();
    //console.log(this.productList);
    for (var i = 0; i < this.productList.length; i++) {
      this.IDs = this.productList[i].id;
      this.arrayId[i] = this.IDs;
      //console.log(this.arrayId[i])
    }
    //67-60-50-10             //2-10-1-2       //5-1-2-1
    this.productsId = this.arrayId.join("-");
    return this.productsId;
  }

  getProductsQuantity() {
    this.productList = list();
   // console.log(this.productList);
    for (var i = 0; i < this.productList.length; i++) {
      this.quantity = this.productList[i].quantity;
      this.arrayQuanties[i] =  this.quantity;
    }

    this.quantaties = this.arrayQuanties.join("-");
    return this.quantaties;
  }

  

  placeOrder(form: NgForm) {
    // if (form.invalid) {
    //   alert("Invalid !!!");
    //   return;
    // }
    this.order.sourceAddress = "Ismailia";
    // console.log( this.order.sourceAddress)
    this.order.destinationAddress = this.shipping.destinationAddress;
    // console.log(this.order.destinationAddress)
    this.order.totalPrice = this.cartService.getTotalPrice(),
    // console.log(this.order.totalPrice)
    this.order.arrivalTime = this.myDate,
    // console.log( this.order.arrivalTime)
    this.order.userId = this.getuserID(),
    // console.log( this.order.userId)
    this.order.amount = this.getProductsQuantity(),
    // console.log(this.getProductsQuantity())
    this.order.productId = this.getProductsID(),
    // console.log(this.order.productId)
    this.order.productOwnerID ='1',
    // console.log(this.order)
    this.OrderService.addOrder(
      this.order.sourceAddress,
      this.order.destinationAddress,
      this.order.amount,
      this.order.arrivalTime,
      this.order.totalPrice,
      this.order.productOwnerID,
      this.order.userId,
      this.order.productId
      )


    form.resetForm();
  }


  newProductForm = new FormGroup({
    sourceAddress: new FormControl("", Validators.required),
    destinationAddress: new FormControl("", [Validators.required]),
    arrivalTime: new FormControl("", [Validators.required]),
    totalPrice: new FormControl("", [Validators.required])
  });

  get sourceAddressStatus() {
    return this.newProductForm.controls.sourceAddress.invalid;
  }
  get destinationAddressStatus() {
    return this.newProductForm.controls.destinationAddress.invalid;
  }
  get totalPriceStatus() {
    return this.newProductForm.controls.totalPrice.invalid;
  }
  TotalPrice = this.cartService.getTotalPrice();
}
