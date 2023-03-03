import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthanicationService} from '../../services/authanication.service';
import {FormControl,FormGroup , FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: AuthanicationService,private router: Router) { }
  submitted = false;
  ngOnInit(): void {
  }

  title = 'Login Form';
  loginForm= new FormGroup(
    {
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,])
    });
    get loginFormControl() {
      return this.loginForm.controls;
    }
  loginUser()
  {
    this.submitted = true;
      this.userService.log(this.loginForm.value).then((result:any)=>{
        if(result.status==200)
        {
          localStorage.setItem("token",result.token);          
          this.router.navigateByUrl('/home');
        }
        else
        {
          this.router.navigateByUrl('/');
        }
      },(error) =>{
        alert("Error in login")
        console.log(error);
      });
  }



}
