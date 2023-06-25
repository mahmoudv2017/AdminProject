import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ProductsModule } from './products/products.module';
import {ProductComponent} from './products/components/product/product.component'
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AllResturantsComponent } from './all-resturants/all-resturants/all-resturants.component';
import { ProductCrudComponent } from './product-crud/component/product-crud/product-crud.component';
import { LoginComponent } from './login/component/login/login.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { SignupComponent } from './login/component/signup/signup.component';
import { ResturantCrudComponent } from './resturant-crud/resturant-crud/resturant-crud.component';
import { CartComponent } from './cart-controller/component/cart/cart.component';
import { EditProfileComponent } from './edit-profile/edit-profile/edit-profile.component';
import { PromotionComponent } from './promotion/promotion/promotion.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';

// var routes: Routes  = []

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    AllResturantsComponent,
    ProductCrudComponent,
    LoginComponent,
    SignupComponent,
    ResturantCrudComponent,
    CartComponent,
    EditProfileComponent,
    PromotionComponent,
    HeaderComponent,
    AllProductsComponent,
    TestComponent,
    UsersComponent

  ],
  imports: [
  ReactiveFormsModule,
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,

    ProductsModule,

    SharedModule,
    CommonModule,
    MatSelectModule,
    BrowserModule,

    CarouselModule,

    //  HttpClientModule,
    //  RouterModule,
    FormsModule,
    //  SpinnerComponent
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,

MatDatepickerModule,
MatNativeDateModule

  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'danger' },
}],
  bootstrap: [AppComponent]
})

export class AppModule {
}
