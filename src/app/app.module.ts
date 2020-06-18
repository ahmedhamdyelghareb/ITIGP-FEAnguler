import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {RouterModule} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { WomanComponent } from './components/woman/woman.component';
import { ManComponent } from './components/man/man.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';

import { ProductService } from './Services/product.service';

import {ContactService} from './Services/contact.service'
import {UsersService} from './Services/users.service'

import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgbdModalContent } from './auth/register/register.component';
import { ProductFormComponent } from './components/store/product-form/product-form.component';
import {ProductsComponent} from './components/store/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUSComponent } from './components/contact-us/contact-us.component';
import { ShopLoginComponent } from './components/shop-login/shop-login.component';


import { ServicesectionComponent } from './components/servicesection/servicesection.component';



import { ProductEditComponent } from './components/store/product-edit/product-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    WomanComponent,
    ManComponent,
    SliderComponent,
    FooterComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent,
    NgbdModalContent ,
    ProductFormComponent,
    ProductsComponent,
    CartComponent,
    AboutComponent,
    ContactUSComponent,
    ShopLoginComponent,

    ProductEditComponent,

    ServicesectionComponent,



    ServicesectionComponent,



  ],
  entryComponents: [
    NgbdModalContent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component :HomeComponent},
      {path:'woman',component :WomanComponent},
      {path:'man',component :ManComponent},
      {path:'login',component :LoginComponent},
      {path:'register',component :RegisterComponent},
      {path:'store/products',component :ProductsComponent},
      {path:'store/products/new',component :ProductFormComponent},
      {path:'store/products/Edit/:id',component : ProductEditComponent},
      {path:'cart',component :CartComponent},
      {path:'about',component :AboutComponent},
      {path:'contactus',component :ContactUSComponent},
      {path:'shop/register',component:ShopLoginComponent}
    ])
  ],
  providers: [
    ProductService,
    ContactService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
