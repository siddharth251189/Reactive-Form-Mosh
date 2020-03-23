import { UserNameValidators } from './username.validator';
import { Component, ViewChild } from '@angular/core';
import {FormGroup , FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signupForm=new FormGroup({
   account:new FormGroup({
    userName: new FormControl(''),
    email:new FormControl('')
   }),
    
  })
  log(x){
    console.log(x)
  }
  login(){
    this.signupForm.setErrors({
      invalidLogin:true
    })
    console.log( this.signupForm)
  }

  get username(){
    return this.signupForm.get('account.userName');
  }

  get email(){
    return this.signupForm.get('account.email');
  }
}
