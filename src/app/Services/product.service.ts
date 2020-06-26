import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Product } from '../Models/product.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs";
import {AuthService} from 'src/app/auth/auth.service'

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productDataSource = new BehaviorSubject<Product>(null);
  productDataSource$ = this.productDataSource.asObservable();

  private cartItemNumbers = new BehaviorSubject<Number>(0);
  cartItemNumbers$ = this.cartItemNumbers.asObservable();

  private productObj = new BehaviorSubject(null);
  productObj$ = this.productObj.asObservable();
  private url = "http://localhost:5000/api/home";
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  token;
  if(currentUser){

    this.token = this.currentUser.token;
  }


  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllProducts() {
    return this.http.get("http://localhost:5000/api/home");
  }

  getProductBycategory(category) {
    return this.http.get(`http://localhost:5000/api/home/category/${category}`);
  }




  addProduct(formData:FormData){
    console.log(formData)
    // const formData = new FormData();
    return this.http.post("http://localhost:5000/api/store/create",formData
    ,{headers : new HttpHeaders().set('Authorization',this.token)}
    )
  }


  deleteProduct(id: number): Observable<any> {
    console.log("For deleteeeee",id)
    return this.http.delete(`http://localhost:5000/api/store/Delete/${id}`);
  }


updateProduct(id,product:Product){
  return this.http.patch<Product>(`http://localhost:5000/api/store/Edit/${id}`,product)
}

 getOwnerById(id){
  return this.http.get<{prod}>(`http://localhost:5000/api/store/getUserId/${id}`)
}

getById(id){
  return this.http.get(`http://localhost:5000/api/store/getone/${id}`)
}


  products: Product[];
  getProducts() {
    return this.http.get("http://localhost:5000/api/store/");
  }


}
