import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  form=new FormGroup({
    topics:new FormArray([])
  })
  addTopic(topic: HTMLInputElement){
    (this.topics as FormArray).push(new FormControl(topic.value));
    console.log(this.form.get('topics'))
    topic.value=''
  }
  RemoveTopic(topic:FormControl){
   let index= this.topics.controls.indexOf(topic);
   this.topics.removeAt(index)
  }
  get topics(){
    return this.form.get('topics')
  }
  }
