import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
 
})
export class ContactService {
 private api = 'http://localhost:5000/api/contact'
  constructor(private http : HttpClient) { }

  postMessage(email:string , subject:string , body:string){

    const  content = {
      email:email,
      subject:subject,
      body:body
    }

    
    return this.http.post<{message: string }>(this.api, content)
  }
}
