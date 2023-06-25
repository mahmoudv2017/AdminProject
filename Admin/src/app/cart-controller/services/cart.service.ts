import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }

  getAllCarts(  param?:any  ) {
    // let params = new HttpParams()
    // params = params.append("startDate" , param?.start).append("endDate" , param?.end)
    return this.http.get(environment.baseApi + `Sub` , {headers:{
      authorization:localStorage.getItem("token")
    }} )
  }

  deleteCart(id:number) {
    return this.http.delete(environment.baseApi + 'sub/' + id)
  }

  UpdateState(id:number , payload) {
    debugger
    return this.http.patch(environment.baseApi + 'sub/' + id , payload)
  }

}
