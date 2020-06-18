import { Component, OnInit } from '@angular/core';
import{HttpClient,HttpEventType} from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  selectedFile:File=null;
  constructor(private http:HttpClient,public productService:ProductService,public route:ActivatedRoute) {
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


id
product: any = {
  id: "",
  title: "",
  price: 0,
  imageUrl:"",
  description:"",
  amount:0
}
Product: Product[] = [];
  ngOnInit() {
    let id=this.route.snapshot.paramMap.get('id');
    if(id) this.productService.getById(id).subscribe(p=>this.product=p)
  }


  onAddNewProduct(form:NgForm){

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
form.resetForm();
  }


}
