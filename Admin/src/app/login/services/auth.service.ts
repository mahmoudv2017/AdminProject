// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, tap } from 'rxjs';
// import { RegistrationService } from './registration.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
//   isLoggedIn$ = this._isLoggedIn$.asObservable();

//   constructor(private registService:RegistrationService) { }
//   login(username: string, password: string) {
//     return this.registService.login(username, password).pipe(
//       tap((response: any) => {
//         this._isLoggedIn$.next(true);
//         localStorage.setItem('profanis_auth', response.token);
//       })
//     );
//   }
//   }

