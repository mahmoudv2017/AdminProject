import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './component/cart/cart.component';



@NgModule({
  declarations: [
    // CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CardsModule { }
