import { importProvidersFrom, NgModule } from "@angular/core";
import { provideRouter, RouterModule, Routes } from "@angular/router";

import { AllProductsComponent } from "./products/components/all-products/all-products.component";
import { ProductDetailsComponent } from "./products/components/product-details/product-details.component";
import { CommonModule } from "@angular/common";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";
import { HomeComponent } from "./home/home/home.component";
import { AllResturantsComponent } from "./all-resturants/all-resturants/all-resturants.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ProductCrudComponent } from "./product-crud/component/product-crud/product-crud.component";
import { SignupComponent } from "./login/component/signup/signup.component";
import { LoginComponent } from "./login/component/login/login.component";
import { ResturantCrudComponent } from "./resturant-crud/resturant-crud/resturant-crud.component";
import { CartComponent } from "./cart-controller/component/cart/cart.component";
import { AuthGuard } from './login/component/auth.guard';

import { EditProfileComponent } from "./edit-profile/edit-profile/edit-profile.component";
import { PromotionComponent } from "./promotion/promotion/promotion.component";
import { TestComponent } from "./test/test.component";
import { UsersComponent } from "./users/users.component";
var routes: Routes  = [

   {path:"login",component:LoginComponent},
   {path:"signup",component:SignupComponent},
  {path:"test",component:TestComponent},
      {path:'',redirectTo:'login',pathMatch:"full"},
      {path:"users",component:UsersComponent , canActivate:[AuthGuard]},
      {path:"resturant-crud",component:ResturantCrudComponent , canActivate:[AuthGuard]},
      {path:"cart-controller",component:CartComponent , canActivate:[AuthGuard]},
  {path:"product-crud",component:ProductCrudComponent , canActivate:[AuthGuard]},
  {path:"all-resturants",component:AllResturantsComponent , canActivate:[AuthGuard]},
  {path:"products/:id",component:AllProductsComponent , canActivate:[AuthGuard]},
{path:"edit-profile",component:EditProfileComponent , canActivate:[AuthGuard]},
{path:"promotion",component:PromotionComponent , canActivate:[AuthGuard]},
  {path:"home",component:HomeComponent , canActivate:[AuthGuard]},
  {path:"details/:id",component:ProductDetailsComponent , canActivate:[AuthGuard]},

  {path:"**",redirectTo:"home" ,pathMatch:"full"},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})



export class AppRoutingModule { }

