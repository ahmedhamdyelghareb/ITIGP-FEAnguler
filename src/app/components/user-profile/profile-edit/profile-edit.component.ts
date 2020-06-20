import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(private user: UsersService,
    public route: ActivatedRoute,
    private router: Router) { }

    message
    userData;
    ngOnInit() {
      const {id}= JSON.parse(localStorage.getItem('currentUser'))
      console.log(id)
      this.user.getshopownerdata(id).subscribe(res=>{
        this.userData=res[0]
        console.log(res)
      })
    }

  edit=new FormGroup({
    FName:new FormControl('',[Validators.required]),
    LName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11)]),
    // shopname:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
  })

  onSubmit(){
    console.log(this.edit.value)
    // this.user.addShop(
    //   this.ShopRegForm.value.FName,
    //   this.ShopRegForm.value.LName,
    //   this.ShopRegForm.value.email,
    //   this.ShopRegForm.value.phone,
    //   this.ShopRegForm.value.password,
    //   this.ShopRegForm.value.type,
    //   this.ShopRegForm.value.shopname,
    //   ).subscribe(res => {
    //     console.log(res)
    //     this.message = res.message;
    //   });
  }


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
