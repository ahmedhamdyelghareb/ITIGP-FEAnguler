import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.css']
})
export class WomanComponent implements OnInit {

  products
  public isCollapsed = true;

  constructor(private productService:ProductService) { }

  ngOnInit() {
    return this.productService.getProductBycategory("woman").subscribe(res=>{
      this.products=res;
  })

}

}
