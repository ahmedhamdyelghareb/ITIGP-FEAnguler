import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UsersService } from '../../Services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UsersService,public route: ActivatedRoute, private router: Router) { }
  id
  onAddUser(form: NgForm) {
    // if (form.invalid) {
    //   alert('Invalid Data !!!')
    //   return;
    // }
   
      this.userService.addUser(form.value.firstName,form.value.lastName, form.value.email, form.value.phoneNumber,form.value.password ,Number(form.value.DOB ))
    
      //this.router.navigate(['/login'])
    // }
    form.resetForm();
  }
 
  newUserForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.min(1)]),
    phoneNumber: new FormControl('', [Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    DOB:new FormControl('',[Validators.required]),

  })

  ngOnInit() {
  }

}
