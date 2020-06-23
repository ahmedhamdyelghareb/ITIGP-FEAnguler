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
  token = this.currentUser.token;

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllProducts() {
    return this.http.get("http://localhost:5000/api/home");
  }

  getProductBycategory(category) {
    return this.http.get(`http://localhost:5000/api/home/category/${category}`);
  }

  // addProduct(
  //   title: string,
  //   price: number,
  //   imageUrl: string,
  //   description: string,
  //   amount: number
  // )
  // {

  //   const product = {
  //     id:this.id,
  //     title: title,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //     amount: amount
  //   };

  //   console.log(product);

  //   return this.http.post<{ message: string }>(
  //   "http://localhost:5000/api/store/create",
  //     product
  //   );
  // }


  addProduct(formData:FormData){
    // const formData = new FormData();
    return this.http.post("http://localhost:5000/api/store/create",formData
    ,{headers : new HttpHeaders().set("authorization", this.token)}
    )
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5000/api/store/Delete/${id}`);
  }


updateProduct(id,product:Product){
  return this.http.patch<Product>(`http://localhost:5000/api/store/Edit/${id}`,product)
}


getById(id){
  return this.http.get(`http://localhost:5000/api/store/getone/${id}`)


}
  products: Product[];
  getProducts() {
    return this.http.get("http://localhost:5000/api/store/");
  }


}