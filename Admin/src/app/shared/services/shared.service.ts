import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',

})
export class SharedService {

  constructor(private _router:Router ,  private http:HttpClient) { }

  LogMeOut(){
    localStorage.setItem('Loggedin','false');
    localStorage.setItem('user','{}');
  //  this._router.navigateByUrl('/home')
    location.replace("login")

  }
  LogMeIn(user:{} , token){
    localStorage.setItem('Loggedin','true');
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    location.replace("home")
  //  this._router.navigateByUrl('/home')
  }
  RetrieveUser(){

   
    if(!localStorage.getItem("user")){
      localStorage.setItem("user","{}")
    }

   return this.http.get(environment.baseApi+"user/"+JSON.parse(localStorage.getItem("user")).userID)
   
    

  }
  my_checkAuth(){
    if(localStorage.getItem('Loggedin') == 'true') return true;
    return false
  }




}
