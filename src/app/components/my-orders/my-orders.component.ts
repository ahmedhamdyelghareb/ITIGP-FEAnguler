import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private orderService: OrderService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOrdersByUserID()
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
  getOrdersByUserID() {
    if (this.getId())
    console.log(this.getId())
      this.orderService.orderByID(this.getId())    ////////////////////user
        .subscribe((o: any) => this.Orders = o)
  }
  onDelete(orderID) {
    if (!confirm('are you sure you want to delete this order')) return;
    this.orderService.deleteOrder(orderID)
    alert('the order is deleted !')
    // console.log(orderID)
   // this.router.navigate(['/product'])
    // this.router.navigate(['/admin/products'])
  }

}
