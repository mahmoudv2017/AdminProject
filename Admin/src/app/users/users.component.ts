import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from './services/user-service.service';
import swal2 from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
form:FormGroup
users;
selected_user;
loading=true;
/**
 *
 */
constructor(private build:FormBuilder , public userService:UserServiceService) {

  this.form = build.group({
    userName:['',[]],
    firstName:['',[]],
    lastName:['',[]],

    address:['',[]],

  })

}
  ngOnInit(): void {

    this.userService.GetAllUsers()
    .subscribe({
      next:(res)=>{
        this.users = res
        this.loading = false
      }

    })
  }

 async deleteUser(user2){
    if( ( await swal2.fire( {
      title:"Confirmation",
      text:"Are You Sure You want to delete this user ?",
      icon:"info",
      showDenyButton:true,
      showConfirmButton:true

    })).isConfirmed  ){
      this.userService.DeleteUser(user2.userID)
      .subscribe({
        next: async (res)=>{
          await swal2.fire("Success" , `user ${user2.userName} was Deleted Successfully` , 'success')
          this.users = this.users.filter(user => user.userID != user2.userID)
        }
      })
    }
  }
  view(index){
    this.selected_user = this.users[index]
    this.form.patchValue({
      userName:this.users[index].userName,
      firstName:this.users[index].firstName,
      lastName:this.users[index].lastName,
      email:this.users[index].email,
      address:this.users[index].address,
    })
  }

  async UpdateUser(profileimg){
    let payload = {...this.selected_user , ...this.form.value}
    const formdataer = new FormData()

    for(let item in payload){
      formdataer.append ( item , payload[item])
    }
    debugger
    if(profileimg.files.length > 0){
      console.log(profileimg)
      formdataer.append('profileImg' , profileimg.files[0])
    }

    console.log(formdataer)
    if(( await swal2.fire( {
      title:"Confirmation",
      text:"Are You Sure You want to update this user ?",
      icon:"info",
      showDenyButton:true,
      showConfirmButton:true

    }) ).isConfirmed ){
      this.userService.UpdateUser(this.selected_user.userID , formdataer)
      .subscribe({
        next: async (res)=>{
         await swal2.fire("Success" , `user ${this.selected_user.userName} was updated Successfully` , 'success')
         location.reload()
        },
        error: async (err)=>{
          await swal2.fire("Failure" , `user ${this.selected_user.username} was'nt updated` , 'error')

        }
      })
    }

  }
}
