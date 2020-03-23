# Reactive Form Mosh
 learn working with reactive forms with mosh 

## Initial Step of working with Reactive Form
step 1. Import ReactiveFormsModule from @angular/forms
step 2. Add ReactiveFormsModule into imports

### app.module.ts
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Creating Controls Programmaticlly
For creating control in reactive form we need to import FormGroup and FormControl from @angular/forms.
```typescript
import {FormGroup , FormControl} from '@angular/forms'
```

After that we need to create copy of FormGroup holding in a variable and create control.

### Create form
```typescript
signupForm=new FormGroup();
```

### Create form control
```typescript
signupForm=new FormGroup({
    userName:new FormControl(),
    email:new FormControl()
  })
```

## Now we need to sync this form with html form and control.

### Sync form with html form
We need to add formGroup property in form tag and assign your form from typescript file.
```html
<form [formGroup]="signupForm"></form>
```

### Sync control with html control
We need to add formControlName html control tag and assign your control name from typescript file.
```html
<div class="form-group">
          <label for="">User Name</label>
          <input type="text" 
          class="form-control"
          formControlName="userName"
          >
        
</div>
```

### app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### app.component.ts
```typescript
import { Component, ViewChild } from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signupForm=new FormGroup({
    userName:new FormControl(),
    email:new FormControl()
  })

}


```
### app.component.html
```html
<div class="container">
  <div class="row">
    <form [formGroup]="signupForm">
      <div class="col-lg-12">
        <div class="form-group">
          <label for="">User Name</label>
          <input type="text" 
          class="form-control"
          formControlName="userName"
          
          >
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="text" 
          class="form-control"
          formControlName="email"
          >
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>

  </div>
</div>
```

## Adding Validation
### Steps

1. For adding validation we need to import Validators form @angular/forms.
```typescript
import {FormGroup , FormControl, Validators} from '@angular/forms'
```
2. After that use this function in formControl as a second argument.
```typescript
userName:new FormControl(null,Validators.required),
```
## Showing Validation Message Method 1
```html

 <div class="form-group">
          <label for="">User Name</label>
          <input type="text" 
          class="form-control"
          formControlName="userName"
          >
          <div *ngIf="signupForm.get('userName').touched && signupForm.get('userName').invalid" class="alert alert-danger">Username is required</div>
        </div>
```
## Showing Validation Message Method 2
In method one there is lots of code. we can optimise this code by using a get function. for this we need to add a get function to typescript file like below:

```typescript
  get username(){
    return this.signupForm.get('userName');
  }

```
Now at place of signupForm.get('userName') we can use only username.so updated code will be:

```html

 <div class="form-group">
          <label for="">User Name</label>
          <input type="text" 
          class="form-control"
          formControlName="userName"
          >
          <div *ngIf="username.touched && username.invalid" class="alert alert-danger">Username is required</div>
        </div>
```



## Specific Validation Error

### app.component.ts
```typescript
import { Component, ViewChild } from '@angular/core';
import {FormGroup , FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signupForm=new FormGroup({
    userName:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  get username(){
    return this.signupForm.get('username');
  }
}

```

### app.component.html
```html
<div class="alert alert-danger" *ngIf="signupForm.get('email').touched && signupForm.get('email').invalid">
            <p *ngIf="signupForm.get('email').errors.required">Email is required</p>
            <p *ngIf="signupForm.get('email').errors.email">Enter Valid Email Id</p>
          </div>
```


## Implementing Custom Validation

For Implement custom validator we need to use ValidatorFn Interface.
A function that receives a control and synchronously returns a map of validation errors if present, otherwise null.
```typescript
interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}
```
Here is an eaxample of custom validator which will show error when user will enter 'mosh'.

### username.validator.ts

```typescript

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserNameValidators{
 
    static UniqueName(control:AbstractControl) : ValidationErrors | null{
        if((control.value as string)==='mosh'){
            return{UniqueName:true};
            return null
    }
    }
}
```
## Add custom validator to form control

```typescript
signupForm=new FormGroup({
    userName:new FormControl(null,[
    UserNameValidators.UniqueName
    ]),
```

## Asynchronous Operations
If we need to perform any asynchronous task in validators so we need to use another validator function.

```typescript
interface AsyncValidatorFn {
  (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
}
```

Here is the eaxample of asynchronous operations in validators:
### username.validator.ts
```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class UserNameValidators{
    
 
    static UniqueName(control:AbstractControl) : Promise <ValidationErrors | null> | Observable <ValidationErrors | null>{
       return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(control.value==='mosh')
                resolve({UniqueName:true});
            else
                    resolve(null);
        
        },2000)
       })
       
    }
}

```
## Add asynchronous custom validator to form control
```typescript
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
    )
    
  })
 }

```

## Showing a Loader Image
By Accessing pending property of control we can show loader or loader text like below :

```html
<div *ngIf="signupForm.get('userName').pending">User Name Availability checking</div>

```

## Validating the Form upon Submit

currently we do not have any login servce which can return us true or false so for demo purpose we are seting a error in form error object with help of logon function and on base of error object of form we will show error.


```typescript
 login(){
    this.signupForm.setErrors({
      invalidLogin:true
    })
    console.log( this.signupForm)
  }
```
For Showing error we need to add a div like below:


```html
<div *ngIf="signupForm.errors" class="alert alert-danger">
        The username or password is invalid
      </div>
```

## Nested FormGroups
In the angular reactive form we can nest one fomrGroup into another form group. let's see how we can do this.

First we need to create a form group , In this example our parent formGroup will be signupForm and we will nest account FormGroup into this:
```typescript
signupForm=new FormGroup({
    account:new FormGroup({
      userName: new FormControl(''),
      email:new FormControl('')
    })
    
  })
    get username(){
    return this.signupForm.get('account.userName');
  }

  get email(){
    return this.signupForm.get('account.email');
  }
```
Now on the browser we will face some error so for solve these errors we need to add a formGroup into our template also:

```html
 <div formGroupName="account">
          <div class="form-group">
            <label for="">User Name</label>
            <input type="text" 
            class="form-control"
            formControlName="userName"
            (change)="log(signupForm.get('userName'))"
            >
            <div *ngIf="username.pending">User Name Availability checking</div>
            <div *ngIf="username.touched && username.invalid" class="alert alert-danger">
              <p *ngIf="username.errors.required">User Name is required</p>
              <p *ngIf="username.errors.UniqueName">User Name Must be Unique</p>
            </div>
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input type="email" 
            class="form-control"
            formControlName="email"
            
            >
            <div class="alert alert-danger" *ngIf="email.touched && email.invalid">
              <p *ngIf="email.errors.required">Email is required</p>
              <p *ngIf="email.errors.email">Enter Valid Email Id</p>
            </div>
          </div>
        </div>
```


## Understanding FromArray in Angular Reactive Form 
A FormArray is responsible for managing a collection of AbstractControl, which can be a FormGroup, a FormControl, or another FormArray.

Just like a FormGroup, which groups AbstractControl objects in an object, a FormArray does the same but in an array. Angular exposes specific APIs to help you manage this collection, which we’ll delve into later on.

### How to use FormArray
In order to working with FormArray we need to create a FormArray in FormGroup:
```typescript
form=new FormGroup({
    topics:new FormArray([])
  })
```
### Pushing AbstractControl into the FormArray
```typescript
addTopic(topic: HTMLInputElement){
    (this.topics as FormArray).push(new FormControl(topic.value));
    console.log(this.form.get('topics'))
    topic.value=''
  }
```
### Removeing AbstractControl into the FormArray

```typescript
  RemoveTopic(topic:FormControl){
   let index= this.topics.controls.indexOf(topic);
   this.topics.removeAt(index)
  }

```
### Call RemoveTopic function
```html
<li class="list-group-item" 
*ngFor="let topic of topics.controls"
(click)="RemoveTopic(topic)"
>
    {{topic.value}}
</li>
```

### Other FormArray Methods
```
removeAt(index):
```
This method takes an index and removes the matching AbstractControl. Under the hood, it just calls the native splice method:

```
insert(index, AbstractControl):
```
The opposite of the removeAt() method. It inserts a new AbstractControl at the given index in the controls array:

```
clear():
```
Removes all the elements from the array:

```
setControl(index, AbstractControl):
```

Unlike the insert method, it replaces an existing control with the provided one. In this example it’s used in a replace() method, which replaces the first control with a newly created one:

```
at(index):
```


## FormBuilder

Suppose we have a complex form group like below:

```typescript
form=new FormGroup({
  name:new FormControl(),
  contact:new FormGroup({
    email:new FormControl(),
    phone:new FormControl()
  }),
  topics:new FormArray([])
})

```

It looks so messy and complex. In angular we have FormBuilder for this issue.

## How to use FormBuilder

First import FormBuilder from '@angular/forms'

```typescript
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
```
After import call FormBuilder into constructor in a variable.

```typescript
constructor(fBuilder:FormBuilder) { 
  fBuilder.group({
    name:['',Validators.required],
    contact:fBuilder.group({
      email:[],
      phone:[]
    }),
    topics:fBuilder.array([])
    
  })

```