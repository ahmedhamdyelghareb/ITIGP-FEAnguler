import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.css']
})
export class ShopLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ShopRegForm=new FormGroup({
    FName:new FormControl('',Validators.nullValidator),
    LName:new FormControl('',Validators.nullValidator),
    email:new FormControl('',Validators.nullValidator),
    password:new FormControl('',Validators.nullValidator),
    phone:new FormControl('',),
    shopname:new FormControl('',),
    agree:new FormControl('',),
    address:new FormControl('',),
    type:new FormControl('shop')
  })

  onSubmit(){
    console.log(this.ShopRegForm.value)
  }
}
