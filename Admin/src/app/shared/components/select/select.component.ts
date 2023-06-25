import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent  implements OnInit{
 @Input() title:string="";
 @Input() data:any[]=['Breakfast' , 'Lunch' , 'Dinner']
 @Output() selectedValue=new EventEmitter()
  ngOnInit(): void {
    this.data =['Breakfast' , 'Lunch' , 'Dinner']
  }
  detectChanges(event:any){
    this.selectedValue.emit(event)

  }

}
