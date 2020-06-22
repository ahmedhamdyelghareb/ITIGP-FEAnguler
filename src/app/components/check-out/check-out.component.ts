import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm , NgModel} from '@angular/forms';
import { ShoppingCartService } from '../../Services/shopping-cart.service';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  // private orderService : UserOrderService,

  constructor(private cartService:ShoppingCartService ,private OrderService : OrderService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  shipping = {
        sourceAddress : "",
        destinationAddress : "",
       // amount : "",
        arrivalTime : "",
        totalPrice : "",
        // productOwnerID : "",
        // userId : ""
  }; 
  order= {
    userName:"",
    totalPrice:0,
    products:null
  }
  id
  
  newProductForm = new FormGroup({
    sourceAddress: new FormControl('', Validators.required),
    destinationAddress: new FormControl('', [Validators.required]),
    arrivalTime: new FormControl('', [Validators.required]),
    totalPrice:new FormControl('',[Validators.required])
  })

  get sourceAddressStatus() {

    return this.newProductForm.controls.sourceAddress.invalid
  }
  get destinationAddressStatus() {
    return this.newProductForm.controls.destinationAddress.invalid
  }
  get totalPriceStatus() {
    return this.newProductForm.controls.totalPrice.invalid
  }
  TotalPrice = this.cartService.getTotalPrice()

}
