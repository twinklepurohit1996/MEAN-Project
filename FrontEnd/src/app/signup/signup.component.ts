import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms'
import {ValidateService} from '../customValidation/validate.service'
import {AuthServicesService} from '../services/auth-services.service'
import { Confirm, Notify } from 'notiflix';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    focus;
    focus1;
    focus2;
    submitted = false;
    file: any;
    constructor(private customValidator:ValidateService,private userService:AuthServicesService,private router: Router) { }

    ngOnInit() {}
    public validationMessages = { 
        'firstname': [
        { type: 'required', message: 'First Name is required' },
        { type: 'pattern', message: 'Pleasr Enter a valid First Name' },], 
        'lastname': [
          { type: 'required', message: 'Last Name is required' },
          { type: 'pattern', message: 'Pleasr Enter a valid First Name' },],
        'email': [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' }],
        'mob': [
          { type: 'required', message: 'Mobile Number is required' },
          { type: 'invalidmob', message: 'Please enter a valid mobile number' },
          { type: 'minlength', message: 'Mobile Number minlength is 10' },
          { type: 'maxlength', message: 'Mobile Number maxlength is 10' }]
        ,
        'dob': [
          { type: 'required', message: 'Date of Birth is required' }],
    
        'password': [
          { type: 'required', message: 'Password is required' },
          { type: 'invalidPassword', message: ' Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number' }
        ],
        'confirmPassword': [
          { type: 'required', message: 'Confirm Password is required' },
          { type: 'passwordMismatch', message: 'Password not Match' }],
        'xgen': [
          { type: 'required', message: 'Gender is required' }],
        'xcity': [
          { type: 'required', message: 'City is required' }],
        'file': [
          { type: 'required', message: 'Image is required' }]
      };
      registerForm = new FormGroup(
        {
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required, Validators.compose([Validators.required, this.customValidator.patternValidator()])]),
          confirmPassword: new FormControl('', [Validators.required]),
          firstname: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
          lastname: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
          xgen: new FormControl('', [Validators.required]),
          file: new FormControl(null, [Validators.required]),
          dob: new FormControl('', [Validators.required]),
          xcity: new FormControl( null,[Validators.required]),
          mob: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.compose([Validators.required, this.customValidator.patternValidatormob()])]),
        }, [
        this.customValidator.MatchPassword('password', 'confirmPassword')
      ]);
    
      
      onFileSelected(event: any) {
        console.log(event);
        this.file = event.target.files[0];
        console.log(this.file);
      }
      public registerUser() {
        this.submitted = true;
        if(this.registerForm.invalid){
          return
        }
        console.log(this.registerForm.value);
        const data = this.registerForm.value;
            const fd = new FormData();
            fd.append('file', this.file);
            fd.append('email', data.email);
            fd.append('password', data.password);
            fd.append('confirmPassword', data.confirmPassword);
            fd.append('firstname', data.firstname);
            fd.append('lastname', data.lastname);
            fd.append('xgen', data.xgen);
            fd.append('dob', data.dob);
            fd.append('city', data.xcity);
            // fd.append('role', data.role);
            fd.append('mob', data.mob);
            console.log(fd);
            this.userService.register(fd).then((result: any) => {
              console.log(result);
              if (result.status == 200) {
                console.log(result);
                Notify.success('Success', result.message);
                this.submitted = false;
                this.router.navigateByUrl('/login');
              }
              else if (result.status == 400) {
                Notify.info('Warning', result.message);
              }
              else if (result.status == 401) {
                Notify.warning('Password Matching', result.message);
              }
              else {
                Notify.warning('Error', result.message);
              }
            }).catch(err => {
              alert("Error Data")
              console.log(err)
            })
          }
      
    
  
}
