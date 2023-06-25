import { Component, OnChanges, SimpleChanges , OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/users/services/user-service.service';
import { async } from '@angular/core/testing';
import swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges , OnInit {
  current_user
  auth_flag
  form:FormGroup
  constructor(public sh:SharedService , private build:FormBuilder , private userService:UserServiceService){
   
    
   
  }
  ngOnInit(): void {
    this.sh.RetrieveUser().subscribe(res => {
      this.current_user = res
      this.auth_flag = this.sh.my_checkAuth()
      this.form = this.build.group({
        userName:[this.current_user.userName,[]],
        firstName:[this.current_user.firstName,[]],
        lastName:[this.current_user.lastName,[]],
        email:[this.current_user.email,[]],
        address:[this.current_user.address,[]],
  
      })
      
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.auth_flag = this.sh.my_checkAuth()
  }
  id:any
  drop(param:any){
    if(this.id==param){
      this.id=" "
    }
    else{
      this.id=param;
    }

  }

  async UpdateUser( profileImg){

        console.log()

        let payload = {id:this.current_user._id , ...this.form.value}
        var formdataer = new FormData()

        for(let item in payload){
          formdataer.append(item,payload[item])
        }
        if( profileImg.files.length > 0){
          formdataer.append('profileImg' ,profileImg.files[0] )
        }
      debugger

        this.userService.UpdateUser(this.current_user._id , formdataer)
        .subscribe({
          next: async (res)=>{
            await swal.fire("success",'You have succesfully Updated Your Profile' , 'success')
            this.current_user = {_id:this.current_user.userID , ...this.form.value}
            localStorage.setItem("user",JSON.stringify( this.current_user))
          },
          error:async(err)=>{
            await swal.fire("failure",'Somthing Wrong Has Happened ' , 'error')

          }
        })


    //  this.userService.UpdateUser()
  }
}
