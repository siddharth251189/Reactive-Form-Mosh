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
   
    userName: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
       
      ],
      [UserNameValidators.UniqueName]
    ),
    email:new FormControl(null,[Validators.required,Validators.email])
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
    return this.signupForm.get('userName');
  }

  get email(){
    return this.signupForm.get('email');
  }
}
