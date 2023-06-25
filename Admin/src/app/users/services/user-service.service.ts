import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  GetAllUsers(){
    return this.http.get(environment.baseApi + 'User')
  }

  UpdateUser(userID , payload){

    return this.http.patch(environment.baseApi + 'User/'+userID , payload)
  }


  DeleteUser(userID ){
    return this.http.delete(environment.baseApi + 'User/'+userID )
  }


}
