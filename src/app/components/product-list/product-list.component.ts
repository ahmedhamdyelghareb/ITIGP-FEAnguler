import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products
  constructor(private productService:ProductService) { }

  ngOnInit() {
    return this.productService.getAllProducts().subscribe(res=>{
      this.products=res;
    })
    
  }

}
