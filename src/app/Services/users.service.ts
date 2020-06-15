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
    return this.myHttp.get(`http://localhost:5000/api/user`)
  }
  userByID(id){
   return this.myHttp.get(`http://localhost:5000/api/user/profile/update/${id}`,{
     // headers :new HttpHeaders().set("authorization", this.token)
    });
  }
  addUser(fName:string,lName:string , email:string ,  phone:string , password:string ,DOB:string  ){
    console.log("uuuuuuuuuuuuuu")
   const user = { fName: fName,lName:lName, email: email ,phone:phone , password:password , DOB:DOB};
   console.log(user)
   return this.myHttp.post<{message: string }>(this.baseUrl, user)
  }
}
