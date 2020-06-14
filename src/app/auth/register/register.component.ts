import { Component, OnInit , OnDestroy} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from "@angular/forms";
import { UsersService } from "../../Services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

import { MustMatch } from "../../helpers/must-match.validator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit , OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    public route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        phoneNumber: ["", Validators.required],
        DOB: ["", Validators.nullValidator]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }
  id
  onAddUser(form: NgForm) {
   
    // this.submitted = true;
    // if (this.registerForm.invalid) {
    //   return
    // }
    console.log("kkkkkkkk")
       this.userService.addUser(
        form.value.firstName,
        form.value.lastName, 
        form.value.email,
         form.value.phoneNumber,
         form.value.password ,
         Number(form.value.DOB )
         )
         .subscribe(
          (message) => {
            console.log(message.message)
            if(message.message == "this email is already exist")
            alert("invalid")
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          
        })

     

  //  this.router.navigate(['/'])
  }

  

  
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }
  mySubscription: any;
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
