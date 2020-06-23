import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
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
    userData = {
      fName:"",
      lName:"",
      email:"",
      password:"",
      phone:"",
      address:"",
      image:""
    }
    ngOnInit() {
      const {id}= JSON.parse(localStorage.getItem('currentUser'))
      console.log(id)
      this.user.getshopownerdata(id).subscribe(res=>{
        this.userData=res[0]
        console.log(res)
      })
    }

  edit=new FormGroup({
    fName:new FormControl('',[Validators.required]),
    lName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11)]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    // shopname:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
  })
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  onSubmit(form:NgForm){
    console.log(this.edit.value)
   this.user.updateUserData(
     this.currentUser.id,
     form.value.fName,
     form.value.lName,
     form.value.email,
     form.value.password,
     form.value.phone,
     form.value.address
    ).subscribe(res => {
      console.log("done")
      console.log("added")
      this.router.navigate(["/profile"])
  });
  console.log("yees")
  form.resetForm();  
}


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
