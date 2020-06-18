import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product[];
  constructor(private productService:ProductService, private router: Router) { }

  ngOnInit() {
  }
  onUpadate(id,product: Product){


    this.productService.updateProduct(id,product);
    this.router.navigate(['store/products'])
  }

}
