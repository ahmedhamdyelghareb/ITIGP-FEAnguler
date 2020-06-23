import { Component, OnInit, Input} from '@angular/core';
import{ ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { Subscription } from 'rxjs';
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


    //  ngOnInit() {

    //  }

// fileProgress(fileInput: any) {
//       this.fileData = <File>fileInput.target.files[0];
//       this.preview();
// }

// preview() {
//     // Show preview
//     var mimeType = this.fileData.type;
//     if (mimeType.match(/image\/*/) == null) {
//       return;
//     }

//     var reader = new FileReader();
//     reader.readAsDataURL(this.fileData);
//     reader.onload = (_event) => {
//       this.previewUrl = reader.result;
//     }
// }

//      selectedFile:File=null;

//     onFileSelected(event){
//       this.selectedFile=<File>event.target.files[0];
//     }
//     onUpload(){
//   const fd=new FormData();
//   fd.append('image',this.selectedFile,this.selectedFile.name);
//   this.http.post('http://localhost:5000/api/store/create',fd,{
//     reportProgress:true,
//     observe:'events'
//   }).subscribe(event=>{
//     if(event.type === HttpEventType.UploadProgress){
//       console.log('uploadProgress' + Math.round(event.loaded/event.total *100) +'%');
//     }else if(event.type === HttpEventType.Response){
//     console.log(event);
//     }
//   });
//     }
//     id:number;
//     Product: Product = {
//       title: "",
//       price: 0,
//       imageUrl:"",
//       id:0,
//       description:"",
//       amount:0
//     }
//     product: Product[] = [];

// //     onFileSelected(event){
// //           if(event.target.files.length >0)
// //           {
// // const file= event.target.files
// //           }
// //         }
//     onAddNewProduct(form: NgForm){
//       const formData = new FormData();
//       formData.append('imageUrl', this.fileData);
//       this.http.post('http://localhost:5000/api/store/create', formData, {
//         reportProgress: true,
//         observe: 'events'
//       })
//       .subscribe(events => {
//         if(events.type === HttpEventType.UploadProgress) {
//           this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
//           console.log(this.fileUploadProgress);
//         } else if(events.type === HttpEventType.Response) {
//           this.fileUploadProgress = '';
//           console.log(events.body);
//           alert('SUCCESS !!');
//         }

//       }) ;
//       this.productService.addProduct(
//         form.value.title,
//         form.value.price,
//         form.value.imageUrl,
//         form.value.description,
//         form.value.amount,
//         ).subscribe(res => {
//           console.log("done")
//           console.log("added")
//       });
//       console.log("yees")
//       form.resetForm();
//         }




ngOnInit() {
}
prp;
img;

onAddNewProduct(product){
  const formData = new FormData();

  formData.append('imageUrl',this.img);
  formData.append('title',product.title);
  formData.append('description',product.description);
  formData.append('price',product.price);
  formData.append('amount',product.amount)

  this.productService.addProduct(formData).subscribe(data => {
    this.prp = data;
  })

  alert("Product Added");
  this.router.navigate(['store/products']);
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



    constructor(private http:HttpClient,public productService:ProductService ,private router: Router) {

     }



     ngOnInit() {

     }



fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
}

preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }


    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }

}

  //    selectedFile:File=null;

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
    id
    Product: Product = {
      title: "",
      price: 0,
      imageUrl:"",
      id: 0,
      description:"",
      amount:0
    }
    product: Product[] = [];

    onAddNewProduct(form: NgForm){
      // const formData = new FormData();
      // formData.append('files', this.fileData);
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
      console.log("yees")
      form.resetForm();
        }
      }
