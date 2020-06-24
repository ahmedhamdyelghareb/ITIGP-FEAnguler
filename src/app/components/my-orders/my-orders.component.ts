import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../Services/order.service";
import {ProductService} from '../../Services/product.service'
import { UsersService} from '../../Services/users.service'
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  today: number = Date.now();
  i:number = 0

  orderID : number = 0 ;
  ownerId : string = ""
  amountArray : string = "";
  amount = []
  productarray : string = "";
  produtcs : any[] = []
  order : any = {
    id : 0,
    orderId:0,
    sourceAddress:"",
    destinationAddress:"",
    status:"",
    amount:"",
    // arrivalTime:Date.now(),
    totalPrice:0,
    productOwnerID:"",
    userId:0,
    productId:"",
  }

  myproduct : any = {
    id : 0,
    title:"",
    price:0,
    imageUrl:"",
    description:"",
    status:"",
    amount:0,
    category:"",
    rate:0,
    userId:0,
    user:{
      id : 0,
      Type:"",
      fName:"",
      lName:"",
      shopName:"",
      email:"",
      password:"",
      status:"",
      address:"",
      gender:"",
      phone:0,
      DOB:"", 
    }
  };

  


  constructor(
    private orderService: OrderService,
    private productService:ProductService,
    private userService:UsersService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOrdersByUserID();

  }
  Orders: any[] = [];
  id;
  currentUser: {
    id;
  };
  getId() {
    if (
      typeof localStorage.getItem("currentUser") !== "undefined" &&
      localStorage.getItem("currentUser") !== null
    ) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (
        typeof this.currentUser.id !== "undefined" &&
        this.currentUser.id !== null
      ) {
        this.id = this.currentUser.id;
      }
      return this.id;
    }
  }
  getOrdersByUserID() {
    if (this.getId()) console.log(this.getId());
    this.orderService
      .orderByID(this.getId()) ////////////////////user
      .subscribe((o: any) => (this.Orders = o));
  }
  onDelete(orderID) {
    if (!confirm("are you sure you want to delete this order")) return;
    else {
      this.orderService.deleteOrder(orderID);

      console.log(orderID);
      this.router.navigate(["/profile"]).then(() => {
        window.location.reload();
      });
    }
  }

  onGetOrderDetailes(orderID) {
    this.orderService.getOrderByID(orderID).subscribe(res => {
      this.order = res
      this.getAmount()
      this.getProduct()
      // console.log(res);
    },err=>{
      console.log(err)
    }
    );
    console.log(orderID);
    // this.router.navigate(["/profile"]).then(() => {
    //   window.location.reload();
    // })
  }
  getAmount(){
    this.amountArray = this.order.amount
    this.amountArray.split('-').forEach(amount => {
        this.amount.push(+amount)
    })
    console.log(this.amount)
  }

  getProduct(){
    this.productarray = this.order.productId
    this.productarray.split('-').forEach(product => {
      // console.log(+product)
      this.productService.getById(+product)
      .subscribe((product : any)=> {
        this.produtcs.push(product)
      })
    })
    console.log(this.produtcs)
  }


  closeResult = "";

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

}

