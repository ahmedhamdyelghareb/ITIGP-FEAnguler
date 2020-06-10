import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product} from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url="http://localhost:5000/api/home"
  constructor(private http:HttpClient) { }

  getAllProducts(){
   return this.http.get('http://localhost:5000/api/home')
    
  }
}
