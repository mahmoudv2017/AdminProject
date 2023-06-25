// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegistrationService {
// private _registrationUrl="http://localhost:3000/signup";
// private _loginUrl="http://localhost:3000/signup";
//   constructor(private http: HttpClient, private uthservice:AuthService) {
//    }
//    registerUser(user:any){
//     return this.http.post<any>(this._registrationUrl,user)
//   }
//   loginUser(username: string, password: string){
//     return this.http.post('login', { username, password });
//   }


//   login(username: string, password: string) {
//     return this.http.post('login', { username, password });
//   }

//   // getProducts(): Observable<ProductModel[]> {
//   //   return this.http.get<ProductModel[]>('products', {
//   //     headers: {},
//   //   });

//   }

