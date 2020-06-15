import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.css']
})
export class ShopLoginComponent implements OnInit {

  constructor(private user: UsersService,
    public route: ActivatedRoute,
    private router: Router,) { }

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
    console.log(this.ShopRegForm.value.FName)
    this.user.addShop(
      this.ShopRegForm.value.FName,
      this.ShopRegForm.value.LName,
      this.ShopRegForm.value.email,
      this.ShopRegForm.value.phone,
      this.ShopRegForm.value.password,
      this.ShopRegForm.value.Type,
      this.ShopRegForm.value.shopName,
      ).subscribe(res => {
        console.log(res)
      });
  }
}
