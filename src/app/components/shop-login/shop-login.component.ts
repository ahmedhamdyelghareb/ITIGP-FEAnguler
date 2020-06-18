import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import {NgbdModalContent} from "../../auth/register/register.component"


import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.css']
})
export class ShopLoginComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(private user: UsersService,
    public route: ActivatedRoute,
    private router: Router,private modalService: NgbModal) { }

    message
  ngOnInit() {
  }

  ShopRegForm=new FormGroup({
    FName:new FormControl('',[Validators.required]),
    LName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11)]),
    shopname:new FormControl('',[Validators.required]),
    agree:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    type:new FormControl('shop')
  })

  onSubmit(){
    console.log(this.ShopRegForm.value)
    this.user.addShop(
      this.ShopRegForm.value.FName,
      this.ShopRegForm.value.LName,
      this.ShopRegForm.value.email,
      this.ShopRegForm.value.phone,
      this.ShopRegForm.value.password,
      this.ShopRegForm.value.type,
      this.ShopRegForm.value.shopname,
      ).subscribe(res => {
        console.log(res)
        this.message = res.message;
        if (res.message == "this email is already exist") {
          this.open();
        } else if (res.message) {
          // console.log(this.message);
          this.open();
        } else {
          // this.router.navigate(["/"]).then(() => {
          //   window.location.reload();
          // });
        }
      });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.message = this.message;
  }
  closeResult = "";
  openLogin(contentLogin) {
    this.modalService
      .open(contentLogin, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReasonLogin(reason)}`;
        }
      );
  }
  private getDismissReasonLogin(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  
}
