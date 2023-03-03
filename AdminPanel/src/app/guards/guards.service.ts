import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate{

  constructor(private router:Router ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!localStorage.getItem("token"))  {
      console.log('You are not allowed to view this page');
      this.router.navigateByUrl('/');
      return false;
    } 
    return true;
  }
}
