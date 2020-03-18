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

