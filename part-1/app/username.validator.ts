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