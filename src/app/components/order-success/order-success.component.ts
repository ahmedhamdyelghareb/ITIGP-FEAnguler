import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private orderService :OrderService ,  public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOrders()
    this.authToken()
  }
  type: string = ""
  token: string = "hhh"
  username: string = ""
  currentUser: {
    token: string,
    fName: string,
    type: string
  }
  n = 0
  authToken() {
    if (typeof localStorage.getItem('currentUser') !== 'undefined' && localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (typeof this.currentUser.token !== 'undefined' && this.currentUser.token !== null) {
        this.token = this.currentUser.token;
        this.username = this.currentUser.fName
        this.type = this.currentUser.type
        //this.n++
      }
      return true
    } else {
      return false
    }
  }
  Orders: any[]
  // id = "5e470e9e262da0382093749f"
  user
  filteredProducted: any[]
  getOrders() {
    this.orderService.Orders()
      .subscribe(
        (orderData: []) => {
          this.Orders = orderData
          // console.log(this.Orders)
        },
        (err) => {
          console.log(err);
        }
      )
  }

}
