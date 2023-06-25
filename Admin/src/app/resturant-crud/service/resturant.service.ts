import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import slugify from 'slugify';

@Injectable({
  providedIn: 'root'
})
export class ResturantService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  getAllProducts() {
    return this.http.get(environment.baseApi + 'Resturant');
  }
  getAllCategories() {
    return this.http.get(environment.baseApi + 'products/categories');
  }
  getProductByCategory(keyword:string) {
    return this.http.get(environment.baseApi + 'restaurants?search='+keyword);
  }
  getProductById(id:any) {
    return this.http.get(environment.baseApi + 'restaurants/'+id);
  }
  createProduct(model:any){
    let form = new FormData();

    console.log({model:model})
    form.append("title",model.title)
    form.append("slug", slugify(model.title))

    form.append("description",model.description)
    form.append("speciality",model.speciality)
    form.append("rating",model.rating)

    form.append("image",model.image)

  //console.log(form.get("image"))
  debugger
  //  form = {...model};
   console.log(form.get("image"))
   // console.log(form)

return this.http.post(environment.baseApi +'Resturant',form)
  }
  deleteproduct(id:number){
    return this.http.delete(environment.baseApi + 'Resturant/'+id)
    .pipe(map((res:any)=>{
return res;
    }))

  }

  UpdateProduct(id:number , payload:{}){
    let formdata = new FormData()
    formdata.append('id' ,id.toString())
    for (const key in payload) {
      formdata.append(key , payload[key])
    }
    debugger
    return this.http.put(environment.baseApi + 'Resturant/'+id , formdata)


  }

  // getstudent(){
  //   return this._http.get<any>("http://localhost:3000/products")
  //   .pipe(map((res:any)=>{
  //    return res;

  //   }))
  //  }

}
