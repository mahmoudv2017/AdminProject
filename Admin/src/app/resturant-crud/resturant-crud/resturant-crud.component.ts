import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { ResturantService } from '../service/resturant.service';
import sweetalert from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resturant-crud',
  templateUrl: './resturant-crud.component.html',
  styleUrls: ['./resturant-crud.component.scss']
})
export class ResturantCrudComponent implements OnInit{
  products:any[] = [];
  categories:string[] = [];
  loading:boolean = false;
  base64:any = '';
  form!:FormGroup;
  selected_product:{};
  selected_image:File;

  showadd!:boolean;
  showupdate!:boolean;
  constructor(private service:ResturantService , private build:FormBuilder) { }

  add(){
    this.showadd=true;
    this.showupdate=false;
    this.form.reset();
    this.base64="";
  }

  ngOnInit(): void {
    this.form = this.build.group({
      title: ['' , [Validators.required]],
      rating: ['', [Validators.required]],
      // price: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      // category: ['', [Validators.required]]
    })
    this.getProducts()
    this.getCategories()
  }

  get ImgURL(){
    return environment.ImgUrl
  }
  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
     } , error => {
      this.loading = false
     // alert( error)
     }   )
  }

  getCategories() {
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res
     } , error => {
    //  alert( error)
     })
  }

  getSelectedCategory(event:any) {
    this.form.get('category')?.setValue(event.target.value)
    console.log(this.form)
  }


  getImagePath(event:any) {
    const file = event.target.files[0];
    console.log(file)
    this.selected_image=file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.base64 = reader.result;
       this.form.get('image')?.setValue(this.base64)
      // console.log(this.base64)
    };
  }


  addProduct() {


    const model = this.form.value
    debugger
    this.service.createProduct({...model , image:this.selected_image})
    .subscribe( async (res:any) => {
      await sweetalert.fire("Done" , "You Successfully Added a new Restaurant" , "success")
     // this.products.push(res)
      location.reload()

    })
  }

  update(item:any) {
    this.showadd=false;
    console.log(item)
    this.showupdate=true;
   // console.log(item)
    this.form.patchValue({

       title: item.title,
       rating: item.rating,
       description: item.description,

      speciality: item.speciality,


    })
   console.log(this.form.value)
    this.base64 = item.image
    this.selected_product = item;
  }

  UpdateProduct(){
    console.log(this.base64)
 //   console.log({...this.form.value , image:this.selected_image || this.base64})
 console.log( {...this.form.value , image:this.selected_image || this.base64})
debugger
    this.service.UpdateProduct(this.selected_product['id'] , {...this.form.value , image:this.selected_image || this.base64} )
    .subscribe({next: async (res)=>{
      debugger
      await sweetalert.fire("success",`${this.form.value['title']} has been updated` , 'success')

      location.reload()
      // this.products = this.products.map(item => {
      //   if(item.id == this.selected_product['id']){

      //     return {...item , ...this.form.value , image:this.selected_image}
      //   }
      //   return item
      // })

    },
  error: async (err)=> { await sweetalert.fire("error",`Somthing is wrong` , 'error')}})
  }
//"Confirmation" , 'are you sure to delete?' , 'info' ,
  async deleteProduct(data:any){
    if( (await sweetalert.fire( {
      title:"Confirmation",
      text:"Are You Sure You want to delete ?",
      icon:"info",
      showDenyButton:true,
      showConfirmButton:true

    })).isConfirmed){
      debugger
      this.service.deleteproduct(data.id)
      .subscribe( async res=>{
       await sweetalert.fire("Done" , `${data.title} has been deleted` , 'success')
       console.log(data._id)
       this.products = this.products.filter(el => el['_id'] != data._id)
       console.log(this.products)
        // this.getProducts();
      })
    }


  }
  // deleteProduct(index: number) {
  //   this.form.splice(index, 1);
  //   this.getProducts();
  //   localStorage.setItem('card', JSON.stringify(this.products));
  // }

}
