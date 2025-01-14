import { Component, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    clickcount = signal(0);
    clickCount$ = toObservable(this.clickcount); 
    interval$ = interval(1000);
    intervalSignal = toSignal(this.interval$, { initialValue: 0 });

    customInnterval$ = new  Observable((observer) => {
        let count = 0;
        const  interval = setInterval(() => {
          if(count === 5){
            clearInterval(interval);
            observer.complete();
            return;
          }
          console.log("Emmiting new  value")
          observer.next(count++);
        }, 3000);

    })

    ngOnInit(): void {
      this.customInnterval$.subscribe({
        next: (value) => console.log("New  value : ",value),
        complete: () => console.log("Completed"),
        error: (err) => console.log("Error : ",err)
      })
    }

    
}
