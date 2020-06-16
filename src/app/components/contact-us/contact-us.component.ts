import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl, Validators ,  NgForm} from '@angular/forms';
import {ContactService} from '../../Services/contact.service'

import { ActivatedRoute, Router} from "@angular/router";
import { format } from 'url';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  
})
export class ContactUSComponent implements OnInit {
  FormData: FormGroup;
  submitted = false;
  constructor(private builder: FormBuilder  , private contact: ContactService ,private router:Router) { }

  ngOnInit() {
    this.FormData = this.builder.group({
      subject: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      body: new FormControl('', [Validators.required])
  })
}
 SendData(form: NgForm){
  this.submitted = true;
    if (this.FormData.invalid) {
      return;
    }
    return this.contact.postMessage(form.value.email,form.value.subject,form.value.body)
    .subscribe(res=>{
      console.log(res.message)
     alert("Your Message sent; thank you")
    
    })
    
 }
  get f() {
    return this.FormData.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.FormData.invalid) {
      return;
    }
    this.FormData.reset()
  }
}
