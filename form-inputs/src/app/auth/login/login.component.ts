import { CommonModule } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
    if(control.value.includes("?")){
      return null
    }

    return { doesNotContainQuestionMark: true}
}

function EmailIsUnique(control: AbstractControl) {
  if(control.value !== "test@gmail.com"){
    return of(null);
  }

  return of({notunique: true})
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  
  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
      asyncValidators: [EmailIsUnique]
    }), 
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
      
    
    }),
  })
  

  constructor() {

    
  }

  handleFormSubmit(){
    //
  }
}
