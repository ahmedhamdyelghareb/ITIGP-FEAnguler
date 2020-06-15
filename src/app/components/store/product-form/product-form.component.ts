import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  selectedFile:File=null;
  constructor(private http:HttpClient) {
   }
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
  }
  onUpload(){
const fd=new FormData();
fd.append('image',this.selectedFile,this.selectedFile.name);
this.http.post('http://localhost:5000/products/Create',fd).subscribe(res=>{
  console.log(res);
});
  }
  ngOnInit() {
  }
  onAddNewProduct(){
alert("new product added");
  }
}
