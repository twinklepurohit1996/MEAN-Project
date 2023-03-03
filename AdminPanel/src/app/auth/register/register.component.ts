import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup , FormBuilder , Validators} from '@angular/forms';
import { CustomvalidationService } from '../../validation/customvalidation.service';
import {AuthanicationService} from '../../services/authanication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  placeholder="Select City";
  placeholder1="Select Role";

  file: File = null;

  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private toastr: ToastrService ,
    private userService: AuthanicationService,
    private router: Router) {}

    ngOnInit(): void {}

    registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required,Validators.email]),
        password: new FormControl('', [Validators.required,Validators.compose([Validators.required, this.customValidator.patternValidator()])]),
        confirmPassword:new FormControl('', [Validators.required]),
        firstname:new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        xgen:new FormControl('', [Validators.required]),
        dob:new FormControl('', [Validators.required]),
        file:new FormControl('',[Validators.required]),
        city: new FormControl('Select City', [Validators.required]),
        role: new FormControl('Select Role', [Validators.required]),
        mob:new FormControl ('', [Validators.required,Validators.pattern('/[0-9][^a-z,A-Z]$/'),Validators.maxLength(10),Validators.minLength(10)]),
      },[
        this.customValidator.MatchPassword('password','confirmPassword')
      ]);

      get registerFormControl() {
        return this.registerForm.controls;
      }
      onFileSelected(event:any)
      {
        this.file = event.target.files[0];
      }
    public registerUser() 
    {
      this.submitted = true;
      const data=this.registerForm.value;
      const fd =new  FormData();
      fd.append('file',this.file,this.file.name);
      fd.append('email',data.email);
      fd.append('password',data.password);
      fd.append('confirmPassword',data.confirmPassword);
      fd.append('firstname',data.firstname);
      fd.append('lastname',data.lastname);
      fd.append('dob',data.dob);
      fd.append('xgen',data.xgen);
      fd.append('city',data.city);
      fd.append('role',data.role);
      fd.append('mob',data.mob);
      this.userService.registerout(fd).then((result:any)=>{
        if(result.status==200)
      {
        console.log(result);
        this.toastr.success('Success',result.message);
        this.submitted = false;
        this.router.navigateByUrl('/');
      }
      else if(result.status==400)
      {
        this.toastr.info('Warning',result.message);
      }
      else if(result.status==401)
      {
        this.toastr.warning('Password Matching',result.message);
      }
      else
      {
        this.toastr.error('Error', result.message);
      }
      }).catch(err=>{
        alert("Error Data")
        console.log(err)
      })
    }
}

