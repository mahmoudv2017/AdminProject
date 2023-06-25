import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartService } from '../../services/cart.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private service:CartService, private build:FormBuilder , private productService:ProductsService,routet:Router) {
  }
  states = ['active' , 'pending' , 'expired']
  carts:any[] = [];
  products:any[] = [];
  selectedstate;
  total = 0
  loading=true;
  form!:FormGroup;
  details:any;
  ngOnInit(): void {
   this.form = this.build.group({
     start: [''],
     end:['']
   })
    this.getAllCarts()
  }



  getAllCarts() {
    this.service.getAllCarts().subscribe((res:any) => {
      console.log(res)
      this.loading = false;
      this.carts = res
    })
  }

  applyFilter() {
    let date = this.form.value
    this.service.getAllCarts(date).subscribe((res:any) => {
      this.carts = res
    })
  }

   deleteCart(id:number) {
    this.service.deleteCart(id).subscribe( async res => {
      this.carts = this.carts.filter(cart => cart._id != id)
      await swal.fire("success",`you delete all orders from ${res['restaurantName']}` , 'success')

    })
  }


  view(index:number) {
    this.products = this.carts[index].meals
    this.details = this.carts[index].Dates;
    console.log(this.details)
    // for(let x in this.details.products) {
    //   this.productService.getProductById(this.details.products[x].productId).subscribe(res => {
    //     this.products.push({item: res , quantity:this.details.products[x].quantity})
    //   })
    // }
  //  console.log(this.products)
  }

  state_changed(id , state){
    let states = {expired:2 , active:1 , pending:0}
    this.service.UpdateState(id , {substate: states[state]})
    .subscribe({
      next: async ()=>{
        await swal.fire("success" , "You Have Successfully Updated the state" ,"success")
        this.carts.map(cart => {
          if(cart._id == id){
            return {...cart , substate:state}
          }
          return cart
        })
      },
      error: async ()=>{
        await swal.fire("failure" , "You Have Successfully Updated the state" ,"success")

      }
    })
  }
}
