import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { first } from 'rxjs';

function passwordsMatch(control: AbstractControl){
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('passwordConfirmation')?.value;
  if(password === passwordConfirmation){
    return null
  } else {
    return {passwordsDontMatch: true}
  }
}

function passwordsMatchValidator(): any {
  return (formGroup: FormGroup) => {
    const password = formGroup.get('password')?.value;
    const passwordConfirmation = formGroup.get('passwordConfirmation')?.value;
    if(password === passwordConfirmation){
      return null
    } 
      
    return {passwordsDontMatch: true}
  };
}
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {

    form = new FormGroup({
      email: new FormControl("", {validators:[Validators.required, Validators.email]}),
      passwords: new FormGroup({
        password: new FormControl("", { validators: [Validators.required, Validators.minLength(6)]}),
        passwordConfirmation: new FormControl("", {validators:[Validators.required, Validators.minLength(6)]}),
      },  
      {
        validators: [passwordsMatchValidator()]
      }
    ),
      firstName: new FormControl("", {validators:[Validators.required, Validators.minLength(2)]}),
      lastName: new FormControl("", {validators:[Validators.required, Validators.minLength(2)]}),
      adresse: new FormGroup({
        street: new FormControl("", { validators:[Validators.required, Validators.minLength(2)]}),
        number: new FormControl("", {validators:[Validators.required, Validators.minLength(2)]}),
        postalCode: new FormControl("", {validators: [Validators.required, Validators.minLength(2)]}),
        city: new FormControl("", {validators:[Validators.required, Validators.minLength(2)]}),
      }),
      role: new FormControl("", { validators:[Validators.required]}),
      findMethod: new FormArray([
        new FormControl(false),
        new FormControl(true),
        new FormControl(false),
      ]),
      agree : new FormControl(false, { validators: [Validators.required]}),
    
    })


    handleFormSubmit(){
      console.log(this.form.value)
    }
}
