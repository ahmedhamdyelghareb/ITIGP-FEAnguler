
import { Component, OnInit, Input,ViewChild} from '@angular/core';
import{ ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm,FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('editProductForm',{static: false}) editForm: NgForm;


 selectedProduct:Product={
   id:0,
   title:"",
   price:0,
   imageUrl:new FormData(),
   description:"",
   amount:0,
   category:""
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
    this.fetechedProducts = (query) ?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products
   }


  // filter(query:string){
  //   this.fetechedProducts = (query) ?
  //   this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())) : 
  //   this.products
  // }

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


  // onAddNewProduct(form:NgForm){

  //   this.productService.addProduct(
  //     form.value.title,
  //     form.value.price,
  //     form.value.imageUrl,
  //     form.value.description,
  //     form.value.amount,
  //     ).subscribe(res => {
  //       console.log("done")
  //       console.log("added")
  //   });
  //   form.resetForm();
  //     }



//   onFileSelected(event){
//     this.selectedFile=<File>event.target.files[0];
//   }
//   onUpload(){
// const fd=new FormData();
// fd.append('image',this.selectedFile,this.selectedFile.name);
// this.http.post('http://localhost:5000/api/store/create',fd,{
//   reportProgress:true,
//   observe:'events'
// }).subscribe(event=>{
//   if(event.type === HttpEventType.UploadProgress){
//     console.log('uploadProgress' + Math.round(event.loaded/event.total *100) +'%');
//   }else if(event.type === HttpEventType.Response){
//   console.log(event);
//   }
// });
//   }
img;
  imagePreview ;
  onImagePicked(val){
    this.img = val.target.files[0]

    const file = (val.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

  }


  onDeleteProduct(id) {
    if (!confirm('are you sure you want to delete this product')) return;
    this.productService.deleteProduct(id).subscribe(data => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/store/products']);
      });
    })


  }
    // getProductById(product:Product){
    //   this.selectedProduct.id=product.id;
    //   this.selectedProduct.title=product.title;
    //   this.selectedProduct.price=product.price;
    //   this.selectedProduct.imageUrl=product.imageUrl;
    //   this.selectedProduct.description=product.description;
    //   this.selectedProduct.amount=product.amount;
    //   console.log(this.selectedProduct)
    //   this.editForm.form.patchValue({
    //     // id : this.selectedProduct.id,
    //     title : this.selectedProduct.title,
    //     price : this.selectedProduct.price,
    //     imageUrl : this.selectedProduct.imageUrl,
    //     description : this.selectedProduct.description,
    //   })
    // }

    // onSubmitEdit(){
    //   // this.selectedProduct.id = this.editForm.value.id;
    //   this.selectedProduct.title = this.editForm.value.title;
    //   this.selectedProduct.price = this.editForm.value.price;
    //   this.selectedProduct.imageUrl = this.editForm.value.imageUrl;
    //   this.selectedProduct.description = this.editForm.value.description;
    //   this.selectedProduct.amount = this.editForm.value.amount;


    //   console.log(this.selectedProduct);

    //   this.productService.updateProduct(
    //     this.selectedProduct.id,
    //     this.selectedProduct
    //   )
    //     .subscribe(()=> {
    //       this.getAllProducts();
    //       console.log("Product Editted")
    //     }, (err)=>{
    //       console.log(err)
    //     })

    // }

    getProductById(product:Product){
      // this.selectedProduct.id=product.id;
      // this.selectedProduct.title=product.title;
      // this.selectedProduct.price=product.price;
      // this.selectedProduct.imageUrl=product.imageUrl;
      // this.selectedProduct.description=product.description;
      // this.selectedProduct.amount=product.amount;
      // console.log(this.selectedProduct)
      // this.editForm.form.patchValue({
      //   id : this.selectedProduct.id,
      //   title : this.selectedProduct.title,
      //   price : this.selectedProduct.price,
      //   imageUrl : this.selectedProduct.imageUrl,
      //   description : this.selectedProduct.description,
      // })
    }

    onSubmitEdit(){
      // this.selectedProduct.id = this.editForm.value.id;
      // this.selectedProduct.title = this.editForm.value.title;
      // this.selectedProduct.price = this.editForm.value.price;
      // this.selectedProduct.imageUrl = this.editForm.value.imageUrl;
      // this.selectedProduct.description = this.editForm.value.description;
      // this.selectedProduct.amount = this.editForm.value.amount;


      // console.log(this.selectedProduct);

      this.productService.updateProduct(
        this.selectedProduct.id,
        this.selectedProduct
      )
        .subscribe(()=> {
          this.getAllProducts();
          console.log("Product Editted")
        }, (err)=>{
          console.log(err)
        })

    }



  }
