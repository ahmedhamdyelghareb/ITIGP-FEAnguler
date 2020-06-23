import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { list, destroy } from 'cart-localstorage'
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private myHttp: HttpClient, private orderService:OrderService, public route: ActivatedRoute, private router: Router , private authService:AuthService) { }
 

 
  orderList: any[] = []
  cart
  id
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  token = this.currentUser.token;
  
  
  
 
}
