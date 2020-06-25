import { Component, OnInit,ViewChild } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import{Order} from 'src/app/Models/Order.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
  @ViewChild('orderStatus',{static: false})
  orderStatus: NgForm;
  constructor(private orderService: OrderService, public route: ActivatedRoute, private router: Router) { }
  private ordersSub: Subscription;
  ngOnInit() {
    this.getOrdersByownerID()
  }



  Orders: any[] =[]
  id
  currentUser: {
  id
  }
  getId(){
    if (typeof localStorage.getItem('currentUser') !== 'undefined' && localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (typeof this.currentUser.id !== 'undefined' && this.currentUser.id !== null) {
        this.id = this.currentUser.id;
      }
      return this.id
    }
  }
  getOrdersByownerID() {
    if (this.getId())
    console.log(this.getId())
      this.orderService.getOrderByOwnerID(this.getId())    ////////////////////user
        .subscribe((o: any) => this.Orders = o)
  }
acceptOrders(orderId){

  this.orderService.getOrderByID(orderId).subscribe((order: any) => this.Orders = order)
}




}
