import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { list, destroy } from "cart-localstorage";
import { AuthService } from "../auth/auth.service";
import { DatePipe } from '@angular/common';
import {Order} from 'src/app/Models/Order.model';
@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(
    private myHttp: HttpClient,
    private orderService: OrderService,
    public route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  myDate = new Date();
  orderList: any[] = [];
  cart;
  id;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  token = this.currentUser.token;
  baseUrl: string = "http://localhost:5000/api/order";

  addOrder(sourceAddress: string, destinationAddress: string, amount: string,
    arrivalTime:Date,totalPrice:number,productOwnerID:string,userId:number,productId:string
    ) {
    const order = {
      sourceAddress:sourceAddress,
      destinationAddress: destinationAddress,
      amount:amount,
      arrivalTime:arrivalTime,
      totalPrice:totalPrice,
      productOwnerID:productOwnerID,
      productId: productId,
      userId:userId
    };
    console.log(order)
    this.myHttp
      .post<{ message: string }>(`${this.baseUrl}/add`, order, {
        headers: new HttpHeaders().set("authorization", this.token)
      })
      .subscribe(responseData => {
        //this.id = responseData.id;
        console.log(order)
        this.orderList.push(order);
        this.cart = list();
        this.cart = destroy();
        this.router.navigate(["/order_success"]);

      });
  }
  orderByID(id) {
    return this.myHttp.get(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set("authorization", this.token)
    });
  }
  getOrderByID(id) {
    return this.myHttp.get(`${this.baseUrl}/order/${id}`, {
      headers: new HttpHeaders().set("authorization", this.token)
    });
  }

  getOrderByOwnerID(id) {
    return this.myHttp.get(`${this.baseUrl}/owner/${id}`, {
      headers: new HttpHeaders().set("authorization", this.token)
    });
  }

  Orders() {
    return this.myHttp.get(this.baseUrl, {
      headers: new HttpHeaders().set("authorization", this.token)
    });
  }
  deleteOrder(id: string) {
    this.myHttp
      .delete(`${this.baseUrl}/${id}`, {
        headers: new HttpHeaders().set("authorization", this.token)
      })
      .subscribe(() => {
        console.log("Deleted!");
      });
  }

updateStatus(id:number,status:string){
 return this.myHttp.patch(`${this.baseUrl}/EditStatus/${id}`,{
    headers: new HttpHeaders().set("authorization", this.token)
  })
}



}
