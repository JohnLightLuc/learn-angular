## LEARNING ANGULAR COURS FROM UDEMY

### 1- Standalone or not component


App.module.ts
@NgModule({
    declarations: [AppComponent], //standalone false Component
    bootstrap: [AppComponent],
    imports: [HeaderComponent, UserCompenent] // Standalone Component or Dependancies
})

export AppModule(){}


@Component({
    selector: "app-control",
    ...
    encapsulation: ViewEncapsulation.None, // Pour appliquer le style du composants actuels dans les enfants
    host: {
        class: 'control' // Partout ou on appel <app-control /> la classe est ajoutée automatiquement à l'élement
        '(click)': "onclick()"// Associé une evenement à un composant host. Recommender par l'equipe Angular
    }
})
export class ControlComponent{
    @HostBindings('class') className = "control" // Autre alternative à host mais moins utilisé le decorateur
    @HostLstener('click) onClick(){
        console.log("Clicked")
    } // Autre alternative  conseillée par le prof

    private el = inject(ElementRef); // Pour injjecte les elements host dans le composant


    onclick(){
        console.log("click");
        console.log(el)
    }
}

Dans  un composant dont le selector ressemble à ceci: button[appButton], pour applicaqque le stype css du button dans le compsant qui l'appel:

```
    button {
        color: blue,
        ....
    }
```

Devient 
:host {
        color: blue,
        ....
    }


#  Viewchild

@ViewChild5("form") private form? :  ElementRef<HTMLFormElement>;
private form = viewChild<ElementRef<HTMLFormElement>>("form")

@ViewChildren

effect(()=>{
    console.log("the counter is :", this;.counter())
})



# Angular directive

- ngModel, ngIf,  Ngfor
- customer directive   


# Service  
##  Route Ijector
// task.service.ts
@Injectable({
    providerIn: 'root'
})
export class TaskServicce{
    ...
}

// main.ts
bootstrapApplication(AppComponent, {
    providers: [TaskService]  Root injector
}).catch((err) => console.error(err));


##  Element  injector
@Component({
    ...
    imports: [],
    providers: [TaskService]  Inject  service
})


## Custom  DI tokens & Provider
// main.ts
export  const TaskServiceToken = new  InjectionToke<TaskService>('task-service-token')

bootstrapApplication(AppComponent, {
    providers: [{provide: TaskServiceToken, useClass: TaskService}]  
}).catch((err) => console.error(err));


//  Inject service
private taskService  = inject(TaskServiceToken)
constructor(@Inject(TaskServiceToken) private taskService: TaskService)

##  Injection  of  other  value
type TaskStatusOptions  { 
    value: 'open' | 'in-progress'  | 'done',
    taskStatus: TaskStatus,
    text: string 
}[];

export const TASK_STATUS_OPTIONS  = new  InjecctionToken<TaskStatusOptions>('task-status-options')

export  const  TaskStatusOption: TaskStatusOptions =  [
    {
        value:  'open',
        taskStatus: 'OPEN',
        text: 'Open'
    },
    ...
]
export const TaskStatusOptionsProvider: Provider = {
    provide: TASK_STATUS_OPTION,
    useValue: TaskStatusOption
}

// Import  in compoenent
@Component({
    ...
    providers: [TaskStatusOptionsProvider]
})
export  class TaskListComponent{
    ...
    taskStatusOptions  = inject(TASK_STATUS_OPTION);  //  Injecct list

    taskStatusOptions.foreach() // User list

}

