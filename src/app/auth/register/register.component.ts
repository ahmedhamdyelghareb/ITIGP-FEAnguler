import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from "@angular/forms";
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { UsersService } from "../../Services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MustMatch } from "../../helpers/must-match.validator";


@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" style="color:gray">Dukan Replay </h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h5>{{ message }}</h5>
      <!-- <p >please try another email</p> -->
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() message;

  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [NgbModalConfig, NgbModal]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    public route: ActivatedRoute,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }
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
  id;
  message;
  content;
  onAddUser(form: NgForm) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // console.log("kkkkkkkk")
    if (form.value.DOB == null)
      form.value.DOB = null
    return this.userService
      .addUser(
        form.value.firstName,
        form.value.lastName,
        form.value.email,
        form.value.phoneNumber,
        form.value.password,
        form.value.DOB
      )
      .subscribe(res => {
        // console.log(res.message)
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

    //  this.router.navigate(['/'])
  }

  // for make the phone input allow only number
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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

  //for make pop up window in errors

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.message = this.message;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
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
