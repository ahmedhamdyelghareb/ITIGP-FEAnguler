import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {

  constructor(private authService :AuthService,public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  token
  mySubscription: any;
  onLogin(form:NgForm) {
    // console.log(form)
    if (form.invalid) {
      alert("invalid Data")
      return;
    }
    // console.log(form.value.email)
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
        localStorage.setItem('currentUser', JSON.stringify({ token:message.token,  type:message.type ,}));
        // alert('you are logged in successfully !')
        // console.log("User is logged in");
           this.router.navigate(['/'])
          .then(() => {
            window.location.reload()
         
      });
  
    }
    )
 
  }
  newProductForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  })
ngOnDestroy(){
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}
}
