import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private myHttp : HttpClient , private authService:AuthService) {

  }

  baseUrl:string = "http://localhost:5000/api/user/register";
  users(){
    return this.myHttp.get(this.baseUrl)
  }
  userByID(id){
   // console.log(`${this.baseUrl}/${id}`);
   return this.myHttp.get(`${this.baseUrl}/${id}`,{
     // headers :new HttpHeaders().set("authorization", this.token)
    });
  }
  addUser(fName:string,lName:string , email:string , phonenumber:number , password:string ,DOB:number  ){

   const user = { fName: fName,lName:lName, email: email ,phonenumber:phonenumber , password:password , DOB:DOB};
   console.log(user)
   this.myHttp
   .post<{ message: string }>(this.baseUrl,user)
   .subscribe(responseData => {
     console.log(responseData.message);
     //this.postsUpdated.next([...this.posts]);
   });
  }
}
