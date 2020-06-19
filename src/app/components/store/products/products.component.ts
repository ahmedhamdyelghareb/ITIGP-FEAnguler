import { Component, OnInit} from '@angular/core';
import{ ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public productService:ProductService ,private router: Router) {

   }
   product:Product[] = [];
   private productsSub: Subscription;
   ngOnInit() {
     this.getAllProducts()
   }
 id
   products :any []
   fetechedProducts : any[]
   getAllProducts(){
    this.productsSub= this.productService.getProducts()
     .subscribe(
       (productData:[])=>{
         this.fetechedProducts =this.products=productData
       },
       (err)=>{
         console.log(err);
       }
     )
   }

  filter(query:string){
    console.log(query);
  }


// getData(){
//   const url ='https://jsonplaceholder.typicode.com/photos?albumId=1'
//   this.http.get(url).subscribe((res)=>{
//     this.products = res
//     console.log(this.products)
//   })
// }
// getAllProducts(){
//   this.productService.getProducts().subscribe((res)=>{
//         this.products = res
//         console.log(this.products)
//       })
//     }

    onDeleteProduct(id){
      this.productService.deleteProduct(id).subscribe(data=>{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/store/products']);
        });
      })

      this.router.navigate(['/store/products'])
    }
    onUpdateProduct(id,product){
      this.productService.updateProduct(id,product).subscribe(data=>{
        console.log(data,"updated");
      })
    }

    getOne(id:string){
      this.productService.getById(id)
  }
  }


