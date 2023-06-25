// import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
// import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sweelalert from 'sweetalert2'
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products:any[] = [];
  categories: string[] = [];
  loading: boolean = true;
  cartProducts: any[] = [];
  base64;
   sections = {Breakfast:1,Dinner:2,Lunch:3}

  selected_product;
  new_image;
  restID;
  file;

  form:FormGroup
  // color =["red","green","yrr"]
  constructor(private service: ProductsService , private activeRoute:ActivatedRoute , public build:FormBuilder) {
    this.restID = activeRoute.snapshot.params["id"]
    this.form = build.group({
      name:['',Validators.required],
      price:[null,[Validators.min(10)]],
      description:['',[]],

      image:['',[]],
      SectionName:['Dinner' , []]
    })
  }

  get Imgurl(){
    return environment.ImgUrl
  }
  getImagePath(event){
    this.file = event.target.files[0];

    if(this.selected_product){
      this.selected_product.image = this.file;

    }
    console.log(this.selected_product)
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
       this.base64 = reader.result;
       this.form.get('image')?.setValue(this.base64)
      // console.log(this.base64)
    };
  }

  Objectfilter(anyobj:{}){
    for(let entry in anyobj){
      if(anyobj[entry] == '' || anyobj[entry] == null){
        delete anyobj[entry]
      }


    }
    delete anyobj["image"]
    return anyobj
  }

  clearModal(){
    this.form.reset()
    document.querySelector("#creator_img")['src']="";

  }
  async updateMeal(img){
    let all_data;

    let form_payload = new FormData();
    if(typeof this.selected_product.image != 'string'){

      delete this.selected_product.image;

    }

    if(!this.form.valid){
      await sweelalert.fire("Failed" , `invalid data` , 'error')
      return
    }
    all_data = { ...this.selected_product , restaurantId: this.selected_product.restaurant.id , sectionId: this.sections[this.form.value['SectionName']] , image:this.file  , ...this.Objectfilter(this.form.value) }
     console.log(all_data)


    debugger
      for( let entry in all_data){
        form_payload.append(entry , all_data[entry] )
      }

      if(all_data['image']){
        form_payload.append('image' , all_data['image'] )
      }

    this.service.UpdateMeal(all_data["id"], this.selected_product.restaurantID , form_payload)
     .subscribe({next: async (res)=>{
      await sweelalert.fire("Done" , `${this.selected_product.title} has been updated successfully` , 'success')

      this.products = this.products.map(product => {
        if(product['_id'] == this.selected_product._id){
          return {...this.selected_product , ...this.form.value , image: this.base64}
        }
        return product
      })

    }})
  }

  DeleteMeal(item){
    console.log(item)
    debugger
    this.service.DeleteMeal(item.id , item.restaurant.id)
     .subscribe({next: async (res)=>{
      await sweelalert.fire("Done" , `${item.title} has been Deleted successfully` , 'success')
      this.products = this.products.filter(product => product['id'] != item.id)


    }})
  }
  pushme(item:any){
    console.log(item)
    this.base64 = item.image
    this.selected_product = item
    this.form.setValue({title:item.title , price:item.price , description:item.description,
      image:item.image,
      SectionName:item.SectionName
    })
    console.log(this.form.value)



  }



  ngOnInit(): void {
    console.log( this.restID )
    this.getProducts( this.restID );
    // this.getCategories();

  }
  getProducts(restID:number) {
    this.service.getAllProducts(restID).subscribe(
      (res: any) => {
        this.products = res;
        console.log(res);
      },
      (error) => {
        //alert(error);
      }
    );
  }
  getCategories() {
    this.service.getAllCategories().subscribe(
      (res: any) => {
        console.log(res);
        this.categories = res;
      },
      (error) => {
      //  alert(error);
      }
    );
  }
  filterCategory(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getProducts(this.activeRoute.snapshot.params["id"]);
    } else {
      console.log(this.products)
      this.products = this.products.filter(prod => prod['section']['name'] == value)
     
    }
    console.log(value);
  }
  getProductsCategory(keyword: string) {
    // this.service.getProductByCategory(this.activeRoute.snapshot.params["id"] , keyword).subscribe((res: any) => {
    //   this.products = res;
    // });
  }
  addToCart(event: any) {
    console.log(event);
    // in the local storage
    if ("card" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("card")!);
     let exist = this.cartProducts.find(item => item.item.id == event.item.id);
    //  let exist = this.cartProducts.find((item) => item.item.id == event.item.id);
     // this.searchVehicleId = this.description.find(x => x.id === x.id).id.toString();
      if (exist) {
        alert('Product is already in your cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('card', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('card', JSON.stringify(this.cartProducts));
    }
  }

  FilterMeals(event:any){
    debugger
    console.log(this.products)

    
  }
  CreateMeal(meal){
    let all_data;
    // if(typeof this.selected_product.image == 'string'){
    //   this.selected_product.image = this.form.value['image']
    //   delete this.selected_product.image;

    // }
    debugger
    all_data = {restaurantID:this.restID , sectionId : this.sections[this.form.controls['SectionName'].value],image : this.file , ...this.Objectfilter(this.form.value)}
    let form_payload = new FormData();

    for( let entry in all_data){
      form_payload.append(entry , all_data[entry] )
    }

  console.log(form_payload.getAll("image"))
    console.log(all_data)

debugger
    this.service.AddMeal(this.restID , form_payload)
    .subscribe({
      next: async (res:any)=>{
        await sweelalert.fire("Success" , "You Have added a new meal" , "success")
        location.reload()
      },
      error: async (err)=>{
        await sweelalert.fire("Failure" , "Something Went Wrong" , "error")
      }
    })
  }
}
