
import { Component, OnInit, Input} from '@angular/core';
import{ ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { Subscription, from } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup,NgForm,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

export class ProductAddComponent implements OnInit {
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  productForm:NgForm;
    constructor(private http:HttpClient,public productService:ProductService ,private router: Router) {

     }


ngOnInit() {
}
prp;
img;
onAddNewProduct(product){
  const {id}=JSON.parse(localStorage.getItem('currentUser'))
  const formData = new FormData();
  console.log(formData)
  formData.append('imageUrl',this.img);
  formData.append('title',product.title);
  formData.append('description',product.description);
  formData.append('price',product.price);
  formData.append('amount',product.amount);
  formData.append('category',product.category);
  formData.append('userId',id)

  this.productService.addProduct(formData).subscribe(data => {
    this.prp = data;
  })

  alert("Product Added");
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/store/products']);
  });
}

//Image Previewing Section
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








    }

