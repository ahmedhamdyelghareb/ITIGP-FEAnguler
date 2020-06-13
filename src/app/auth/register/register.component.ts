import { Component, OnInit } from "@angular/core";
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
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    public route: ActivatedRoute,
    private router: Router
  ) {}
  id
  onAddUser(form: NgForm) {
      this
      .userService
      .addUser(
        form.value.firstName,
        form.value.lastName, 
        form.value.email,
         form.value.phoneNumber,
         form.value.password ,
         Number(form.value.DOB ))

    this.router.navigate(['/login'])
    form.resetForm();
  }

  

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
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
