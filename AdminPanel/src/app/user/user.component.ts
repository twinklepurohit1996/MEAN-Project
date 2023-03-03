import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomvalidationService } from 'app/validation/customvalidation.service';
import { AuthanicationService } from 'app/services/authanication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // cateData:any;
  // submitted = false;
  id:any;
  submitted = false;
  placeholder = "Select City";
  placeholder1 = "Select Role";

  file: File = null;
  isAdd:boolean;
  constructor(fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private toastr: ToastrService,
    private userService: AuthanicationService,
    private router: Router,private route:ActivatedRoute) {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id')
  
      });
      this.isAdd = !this.id
      if (!this.isAdd) {
        
        // this.registerForm.get('password').clearValidators();
        // this.registerForm.get('password').updateValueAndValidity();

        // this.registerForm.get('confirmPassword').clearValidators();
        // this.registerForm.get('confirmPassword').updateValueAndValidity();

        this.registerForm.get('file').clearValidators();
        // this.registerForm.get('file').updateValueAndValidity();

        this.userService.EditU(this.id).then((data) => {
          const change = new Date(data['data']['dob']).toISOString().split("T")[0];
          const Edituser = {
            firstname:data['data']['firstname'],
            lastname:data['data']['lastname'],
            password:data['data']['password'],
            confirmPassword:data['data']['password'],
            email:data['data']['email'],
            mob:data['data']['mob'],
            dob:change,
            xgen:data['data']['xgen'],
            xcity:data['data']['city'],
            role:data['data']['role']
          }
      
          this.registerForm.patchValue(Edituser)
        })
      }
    }

  ngOnInit() {

  }
  public validationMessages = { 
    'firstname': [
    { type: 'required', message: 'First Name is required' },], 
    'lastname': [
      { type: 'required', message: 'Last Name is required' }],
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
    'role': [
      { type: 'required', message: 'User Role is required' }],
    'file': [
      { type: 'required', message: 'Image is required' }]
  };
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.compose([Validators.required, this.customValidator.patternValidator()])]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      xgen: new FormControl('', [Validators.required]),
      file: new FormControl(null, [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      xcity: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      mob: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.compose([Validators.required, this.customValidator.patternValidatormob()])]),
    }, [
    this.customValidator.MatchPassword('password', 'confirmPassword')
  ]);

  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  public registerUser() {
    this.submitted = true;
    if(this.registerForm?.invalid)
      {
        return
      }
    if (this.isAdd) {
      this.userAdd()
    } else {
      this.userUpdate();
    }
  }

  userAdd()
  {
    const data = this.registerForm.value;
    const fd = new FormData();
    fd.append('file', this.file, this.file.name);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('confirmPassword', data.confirmPassword);
    fd.append('firstname', data.firstname);
    fd.append('lastname', data.lastname);
    fd.append('xgen', data.xgen);
    fd.append('dob', data.dob);
    fd.append('city', data.xcity);
    fd.append('role', data.role);
    fd.append('mob', data.mob);
    console.log(fd);
    this.userService.register(fd).then((result: any) => {
      if (result.status == 200) {
        this.toastr.success('Success', result.message);
        this.submitted = false;
        this.router.navigateByUrl('/dashboard');
      }
      else if (result.status == 400) {
        this.toastr.info('Warning', result.message);
      }
      else if (result.status == 401) {
        this.toastr.warning('Password Matching', result.message);
      }
      else {
        this.toastr.error('Error', result.message);
      }
    }).catch(err => {
      alert("Error Data")
      console.log(err)
    })
  }


  userUpdate()
  {
    const data = this.registerForm.value;
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('firstname', data.firstname);
    fd.append('lastname', data.lastname);
    fd.append('xgen', data.xgen);
    fd.append('dob', data.dob);
    fd.append('city', data.xcity);
    fd.append('role', data.role);
    fd.append('mob', data.mob);
    this.userService.updateU(fd,this.id).then((result: any) => {
          if (result.status == 200) {
            console.log("output" + result);
            this.toastr.success('Success', result.message);
            this.router.navigateByUrl('/dashboard');
            this.submitted = false;
          }
        }).catch(err => {
          this.toastr.error('Error!', 'Toastr fanger!');
          console.log(err)
        });
  }

















 
}
