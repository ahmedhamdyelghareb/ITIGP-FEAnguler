import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.css']
})
export class ManComponent implements OnInit {
  products
  public isCollapsed = true;

  constructor(private productService:ProductService) { }

  ngOnInit() {
    return this.productService.getProductBycategory("man").subscribe(res=>{
      this.products=res;
      
      this.products=this.products.map(function (el) {
        var o = Object.assign({}, el);
        o.isCollapsed = true;
        return o;
      })
  })

}

}
