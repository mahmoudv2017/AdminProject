import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/products/services/products.service';
import sweetalert from 'sweetalert2'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  form2:FormGroup;
  @Input() data!:Product
  @Output() item=new EventEmitter()
  addButton:boolean=false
  amount:number=0
  selected_image;
  selected_product;
  base64:ArrayBuffer|string="";

  /**
   *
   */
  constructor( public Mealservice:ProductsService , public _router:Router , public build:FormBuilder) {
    this.form2 = build.group({
      title: ['' , Validators.required],

       price: ['', Validators.required],

      description: ['', Validators.required],
      image: ['', Validators.required],
      sectionName:['', Validators.required]
      // category: ['', [Validators.required]]
    })


  }
  deleteMeal(product){
    console.log(product)
    this.Mealservice.DeleteMeal(product._id , product.restaurantID)
    .subscribe({next: async (res)=>{
      await sweetalert.fire("Done" , `${product.title} has been deleted` , 'success')

      location.reload()

    } , error : async() => {
      await sweetalert.fire("Done" , `${product.title} has been deleted` , 'success')

      location.reload()
    }})
  }
  showUodate(prodduct){
    this.form2.patchValue({title:"hghgf"})

  }
  EditMeal(product){
    console.log(product)
    // this.Mealservice.UpdateMeal(product._id , product.restaurantID , {...this.form.value ,image:this.selected_image })
    // .subscribe({next: async (res)=>{
    //   await sweetAlert("Done" , `${product.title} has been updated successfully` , 'success')

    //   location.reload()

    // }})
  }
  addMeal(item:any){
    this.Mealservice.AddMeal(item.restaurantID , item)
    .subscribe({
      next: async (res) => {
        await sweetalert.fire("Done" , "You Successfully Added a new Restaurant" , "success")

        //rtansfer to allproducts.ts

      },
      error:(err)=>{

      }
    })
  }
  getImagePath(event:any) {
    const file = event.target.files[0];
    console.log(file)
    this.selected_image=file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.base64 = reader.result;
       this.form2.get('image')?.setValue(this.base64)
      // console.log(this.base64)
    };
  }

  UpdateMeal(item:any){
    console.log({...this.form2.value , image:this.selected_image || this.base64})

    this.Mealservice.UpdateMeal(this.selected_product['restaurantID'] , this.selected_product['_id'], {...this.form2.value , image:this.selected_image || this.base64} )
    .subscribe({next: async (res)=>{ await sweetalert.fire("success",`${this.form2.value['title']} has been updated` , 'success')},
      error: async (err)=> { await sweetalert.fire("error",`Somthing is wrong` , 'error')}})
  }
  ngOnInit(): void {


  }
  add(){
this.item.emit({item:this.data,quntity:this.amount})
  }

}
