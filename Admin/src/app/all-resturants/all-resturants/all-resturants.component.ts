import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import {ResturantServicesService} from '../resturant-services/resturant-services.service'

@Component({
  selector: 'app-all-resturants',
  templateUrl: './all-resturants.component.html',
  styleUrls: ['./all-resturants.component.scss']
})
export class AllResturantsComponent implements OnInit {
  payload;
  all_data;
  loading=true;
  search_text="";
  constructor(public restService:ResturantServicesService){ }
  ngOnInit(): void {
    this.getAll()
  }

  get ImgURL() {
    return environment.ImgUrl
  }
  policyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  filterArr(){
    console.log(this.search_text)
    this.payload = this.all_data.filter(date => date.title.toLowerCase().includes(this.search_text.toLowerCase()))
  }

  getAll(){
    this.restService.GetallRest().subscribe({
      next:(res)=>{
        this.all_data=res
        this.payload=res
        this.loading = false
        console.log(res)
      }
    })
  }
}
