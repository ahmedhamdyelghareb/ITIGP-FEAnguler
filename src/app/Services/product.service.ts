import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url="http://localhost:5000/api/home"
  constructor(private http:HttpClient) { }

  getAllProducts(){
   return this.http.get('http://localhost:5000/api/home')
  }

  getProductBycategory(category){
    return this.http.get(`http://localhost:5000/api/home/category/${category}`)

  }

  addProduct(title:string,price:number,imageUrl: string,description:string,amount:number){
const product={
title:title,
price:price,
imageUrl:imageUrl,
description:description,
amount:amount,

}

console.log(product)

return this.http.post('http://localhost:5000/api/store/create',product)
  }


deleteProduct(id:number):Observable<any>{
  return this.http.delete(`http://localhost:5000/api/store/Delete/${id}`)
}


updateProduct(id,product:Object){
  return this.http.patch<Product>(`http://localhost:5000/api/store/Delete/${id}`,product)
}
products : Product[] = []
getProducts(){
  return this.http.get('http://localhost:5000/api/store/')
}
getById(id){
  return this.http.get(`http://localhost:5000/api/store/getone/${id}`)


}
}
