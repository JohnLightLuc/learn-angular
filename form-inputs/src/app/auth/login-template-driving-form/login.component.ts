import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>("myform");
  private destroyRef = inject(DestroyRef);

  

  constructor() {

    const saveForm  = window.localStorage.getItem("formData");

    if(saveForm){
      setTimeout(() => {
        this.form().setValue(JSON.parse(saveForm));
      }, 1)
    }
    afterNextRender(() => {
        const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
          next: (value) => window.localStorage.setItem("formData", JSON.stringify(value)),
          error: (err) => console.log(err),
          complete: () => console.log("Completed")
        })

        this.destroyRef.onDestroy(() => {
          subscription?.unsubscribe();
        })
    })
  }

  handleFormSubmit(formData: NgForm){
    console.log(formData.value)
  }
}
