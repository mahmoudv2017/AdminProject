import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  /**
   *
   */
  form:FormGroup
  constructor(public buld:FormBuilder) {
    this.form = buld.group({
      title: ['' , Validators.required],


    })


  }

  patchme(somthin){
    this.form.setValue({title:somthin})
  }
}
