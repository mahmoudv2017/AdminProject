import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResturantServicesService {

  constructor(private http:HttpClient) { }

  GetallRest(){
    console.log("asd")
    return this.http.get(`${environment.baseApi}Resturant`)

  }

  ShowRest(id:any){
    return this.http.get("http://aklney.onrender.com/restaurants/"+id)

  }
  getAllProducts() {
    return this.http.get(environment.baseApi + 'restaurant');
  }
  getAllCategories() {
    return this.http.get(environment.baseApi + 'restaurants/categories');
  }
  getProductByCategory(keyword:string) {
    return this.http.get(environment.baseApi + 'restaurants/category/'+keyword);
  }
  getProductById(id:any) {
    return this.http.get(environment.baseApi + 'restaurants/'+id);
  }
}
