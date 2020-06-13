import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup,FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private authService :AuthService,public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]]
      })
  }
  token
  mySubscription: any;
  onLogin(form:NgForm) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(form.value.email,form.value.password)
    .subscribe(
      (message) => {
        if(message.token ==null)
        {
          alert('email or password invalid!!!')
          return
        }
        else{
        }
        this.token = message.token
        localStorage.setItem('currentUser', JSON.stringify({ token:message.token,  type:message.type }));
        // alert('you are logged in successfully !')
        // console.log("User is logged in");
           this.router.navigate(['/'])
          .then(() => {
            window.location.reload()
         
      });
  
    }
    )
 
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    

  }
  // newLoginForm = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', [Validators.required]),
  // })
ngOnDestroy(){
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}
}
