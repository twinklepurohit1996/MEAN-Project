import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {AuthServicesService} from '../services/auth-services.service'
import { AutoRefeshService } from '../services/auto-refesh.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  submitted = false;

  constructor(private authService:AuthServicesService,private router: Router,private refreshService:AutoRefeshService) { }

  ngOnInit() {
  }

  public validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required' }],
    'password': [
      { type: 'required', message: 'Password is required' },
    ]
   };

   loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    });

    loginUser()
    {
      this.submitted = true;
      this.authService.login(this.loginForm.value).then((result:any)=>{
        if(result.status==200)
        {
          localStorage.setItem("token",result.token);
          this.refreshService.isUserLoggedIn.next(true);
          this.router.navigateByUrl('/landing');
        }
        else
        {
          this.router.navigateByUrl('/login');
        }
      },(error) =>{
        alert("Error in login")
        console.log(error);
      });
    }
}
