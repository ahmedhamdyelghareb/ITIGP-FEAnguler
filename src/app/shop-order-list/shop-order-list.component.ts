
import { Component, OnInit,ViewChild } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-shop-order-list',
  templateUrl: './shop-order-list.component.html',
  styleUrls: ['./shop-order-list.component.css']
})
export class ShopOrderListComponent implements OnInit {

  constructor(private orderService: OrderService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOrdersByownerID()
  }



// selectedOrder:Order={
//   amount:0,
//   destinationAddress:"",
//   id:0,
//   status:"",
//   sourceAddress: "",

//           arrivalTime:any,
//           totalPrice: 0
// };
selectedStatus = "";

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


onAccept(status){
this.selectedStatus = "accept";
this.orderService.updateStatus(this.id,status).subscribe(()=>{
 status=this.selectedStatus;
this.getOrdersByownerID()

})
}






onRejectOrder(orderID) {
  if (!confirm('are you sure you want to delete this order')) return;
  this.orderService.deleteOrder(orderID)
  alert('the order is deleted !')
  // console.log(orderID)
 // this.router.navigate(['/product'])
  // this.router.navigate(['/admin/products'])
}

}
