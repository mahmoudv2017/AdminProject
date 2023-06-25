// import { HttpClient } from '@angular/common/http';
// import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  getAllProducts(restId:number) {
    return this.http.get(environment.baseApi + `Meal/GetAllByResturantId?id=${restId}`);
  }
  getAllCategories() {
    return this.http.get(environment.baseApi + 'products/categories');
  }
  getProductByCategory( restID ,  keyword:string) {
    return this.http.get(environment.baseApi + `restaurants/${restID}/meals?section=`+keyword);
  }
  getProductById(id:any) {
    return this.http.get(environment.baseApi + 'products/'+id);
  }
  DeleteMeal(id:any , restID:number) {
    return this.http.delete(environment.baseApi + `meal/${id}`);
  }

  UpdateMeal(id:any , restID:number , payload:any) {
    return this.http.patch(environment.baseApi + `meal/${id}`,payload);
  }

  AddMeal( restID:number , payload:any) {
    return this.http.post(environment.baseApi + `meal`,payload);
  }


}
