import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-servicesection',
  templateUrl: './servicesection.component.html',
  styleUrls: ['./servicesection.component.css']
})
export class ServicesectionComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private authTokenType: AuthService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
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
