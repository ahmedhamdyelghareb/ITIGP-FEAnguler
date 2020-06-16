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

    message
  ngOnInit() {
  }

  ShopRegForm=new FormGroup({
    FName:new FormControl('',[Validators.required]),
    LName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11)]),
    shopname:new FormControl('',[Validators.required]),
    agree:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    type:new FormControl('shop')
  })

  onSubmit(){
    console.log(this.ShopRegForm.value)
    this.user.addShop(
      this.ShopRegForm.value.FName,
      this.ShopRegForm.value.LName,
      this.ShopRegForm.value.email,
      this.ShopRegForm.value.phone,
      this.ShopRegForm.value.password,
      this.ShopRegForm.value.type,
      this.ShopRegForm.value.shopname,
      ).subscribe(res => {
        console.log(res)
      });
  }

  
  
}
