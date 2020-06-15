import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  ///////////////////navbar validations////////////////////
  constructor(
    private modalService: NgbModal,
    private authTokenType: AuthService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  type: string = "";
  token: string = "hhh";
  id: string = "";
  fName:string=""

  getToken() {
    if (typeof this.token !== "undefined" && this.token !== null)
      return this.token;
    else alert("invalid username or password");
  }
  getType() {
    if (typeof this.type !== "undefined" && this.type !== null)
      return this.type;
    else console.log(this.type);
  }

  ngOnInit() {
    this.authToken();
  }

  currentUser: {
    token: string;
    id: string;
    Type: string;
    fName:string
  };

  authToken() {
    if (
      typeof localStorage.getItem("currentUser") !== "undefined" &&
      localStorage.getItem("currentUser") !== null
    ) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (
        typeof this.currentUser.token !== "undefined" &&
        this.currentUser.token !== null
      ) {
        this.token = this.currentUser.token;
        this.id = this.currentUser.id;
        this.type = this.currentUser.Type;
        this.fName = this.currentUser.fName
      }
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }

  closeResult = "";

  /////////////////register modal
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ////////////////////////////////////////////////login modal
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
