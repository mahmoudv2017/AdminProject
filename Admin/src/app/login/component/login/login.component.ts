import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  SweetAlert  from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private sh:SharedService
  ) {}
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {

    this.http.post<any>(`${environment.baseApi}Authentication/login` , {email:this.loginform.value.email , password:this.loginform.value.password}).subscribe({
      next:async (res) => {
        //match email & password
        console.log("ay7aga")
        console.log(res)
        if(res){
         await SweetAlert.fire("Success", `Welcome Back , ${this.loginform.value.email}`, "success");

          this.sh.LogMeIn(res ,res['token'] );


          this.loginform.reset();
          this.router.navigate(['home'])

        }else{
          await SweetAlert.fire("Somthing Wrong", `User not found with this info !`, "error");

        }
      }
     ,
     error: async (err)=>{

        await SweetAlert.fire("Somthing Wrong", `Invalid Username or Password`, "error");



     }
    }


    )
  }
}
