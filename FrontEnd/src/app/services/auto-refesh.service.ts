import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoRefeshService {
   data:any = {}
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isData: BehaviorSubject<any> = new BehaviorSubject<any>(this.data);

  constructor() { }
}
