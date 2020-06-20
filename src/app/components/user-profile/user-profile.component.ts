import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private User:UsersService) { }
  userData;
  ngOnInit() {
    const {id}= JSON.parse(localStorage.getItem('currentUser'))
    console.log(id)
    this.User.getshopownerdata(id).subscribe(res=>{
      this.userData=res[0]
      console.log(res)
    })
  }

}
