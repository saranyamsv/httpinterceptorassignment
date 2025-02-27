import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

   private loadstatus = new BehaviorSubject<boolean>(false);
    loadobs = this.loadstatus.asObservable();
    displayloader :boolean = false;


    updateLoadingstatus(value:boolean){
     this.loadstatus.next(value);
     console.log(value)
    }
}
