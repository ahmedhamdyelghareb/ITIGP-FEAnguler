import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import {NgbdModalContent} from "../register/register.component"
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  token;
  message;
  mySubscription: any;
  onLogin(form: NgForm) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
   return this.authService
      .login(form.value.email, form.value.password)
      .subscribe(res => {
        this.message = res.error
        console.log(this.message)
     //  alert(this.message)
        if (res.token == null) {
         this.open()
          return;
        }
        this.token = res.token;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            token: res.token,
            Type: res.Type,
            id: res.id
          })
        );
        this.router.navigate(["/"]).then(() => {
          window.location.reload();
        });
      
      });
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
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.message = this.message;
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
