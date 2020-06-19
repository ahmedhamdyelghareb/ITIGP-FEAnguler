
import { Component, OnInit, Input} from '@angular/core';
import{ ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {


 selectedProduct:Product={
   id:0,
   title:"",
   price:0,
   imageUrl:"",
   description:"",
   amount:0
 };
  constructor(private http:HttpClient,public productService:ProductService ,private router: Router) {

   }

   private productsSub: Subscription;
   ngOnInit() {
     this.getAllProducts()
   }
 id
   products :Product []
   fetechedProducts : Product[]
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
   selectedFile:File=null;
  filter(query:string){
    console.log(query);
  }
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
  }
  onUpload(){
const fd=new FormData();
fd.append('image',this.selectedFile,this.selectedFile.name);
this.http.post('http://localhost:5000/api/store/create',fd,{
  reportProgress:true,
  observe:'events'
}).subscribe(event=>{
  if(event.type === HttpEventType.UploadProgress){
    console.log('uploadProgress' + Math.round(event.loaded/event.total *100) +'%');
  }else if(event.type === HttpEventType.Response){
  console.log(event);
  }
});
  }
//new product

  onAddNewProduct(form:NgForm){
if(this.selectedProduct.id==0){
    this.productService.addProduct(
      form.value.title,
      form.value.price,
      form.value.imageUrl,
      form.value.description,
      form.value.amount,
      ).subscribe(res => {
        console.log("done")
        console.log("added")
    });
  }else{
this.productService.updateProduct(this.selectedProduct.id,this.selectedProduct).subscribe(res=>{
  console.log("updated")
  console.log(this.selectedProduct)
})
  }
    form.resetForm();
      }




    onDeleteProduct(id){
      this.productService.deleteProduct(id).subscribe(data=>{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/store/products']);
        });
      })

    }
    getProductById(product:Product){
      this.selectedProduct.id=product.id;
      this.selectedProduct.title=product.title;
      this.selectedProduct.price=product.price;
      this.selectedProduct.imageUrl=product.imageUrl;
      this.selectedProduct.description=product.description;
      this.selectedProduct.amount=product.amount;
      console.log(this.selectedProduct)

    }

  }


