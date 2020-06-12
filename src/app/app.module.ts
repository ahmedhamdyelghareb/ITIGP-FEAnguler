import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


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

  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component :HomeComponent},
      {path:'woman',component :WomanComponent},
      {path:'man',component :ManComponent},
      {path:'login',component :LoginComponent},
      {path:'register',component :RegisterComponent}
    ])
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
