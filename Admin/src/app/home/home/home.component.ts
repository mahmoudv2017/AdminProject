import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  days:any=194;
  hours:any=22;
  mins:any=14;
  secs:any=4;

  x=setInterval(()=>{
    var futureDate=new Date("Mar 4,2023 15:34:24").getTime();//getTime Convert date to ms
    var today=new Date().getTime();
    var distance=futureDate-today;
    this.days=Math.floor(distance/(1000 * 60 * 60 *24) )
    this.hours=Math.floor((distance % (1000 * 60 * 60 *24))/(1000 * 60 * 60) );
    this.mins=Math.floor((distance % (1000 * 60 * 60 ))/(1000 * 60 ) );
    this.secs=Math.floor((distance % (1000 * 60 ))/(1000  ) );
    if(distance<0){
      clearInterval(this.x);
      this.days="Offer Is Expired"
    }
    console.log(this.hours)
  },1000)

}


