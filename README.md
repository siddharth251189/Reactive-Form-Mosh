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
We need to add FormControlName html control tag and assign your control name from typescript file.
```html
<div class="form-group">
          <label for="">User Name</label>
          <input type="text" 
          class="form-control"
          FormControlName="userName"
          
          >
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
          FormControlName="userName"
          
          >
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="text" 
          class="form-control"
          FormControlName="email"
          >
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>

  </div>
</div>
```

## Adding Validation