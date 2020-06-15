import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  filter(query:string){
    console.log(query);
  }
  products=[
    {title:'bag',price:10},
    {title:'shoe',price:50},
    {title:'hat',price:110},
    {title:'glass',price:101},
  ]
  ngOnInit() {
  }

}
