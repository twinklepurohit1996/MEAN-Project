import { Component, OnInit } from '@angular/core';
import { AuthanicationService } from 'app/services/authanication.service';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'app/services/categorie.service';
import {FormControl,FormGroup , Validators} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Confirm, Notify } from 'notiflix';
import { userInfo } from 'os';
import { ProfileService } from 'app/services/profile.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData:any
  submitted = false;
  test:any;
  jwtData:any;
  userInfo:any;
  _id:any;
  constructor(private userService: AuthanicationService,private profileService:ProfileService,private toastr: ToastrService ,private cateService: CategorieService,private router: Router) { }

  cate = new FormGroup(
    {
      _id: new FormControl(""),
      cname: new FormControl('', [Validators.required])
    });
    get cateFormControl() {
      return this.cate.controls;
    }
  ngOnInit() {
    this.showUser();
    localStorage.getItem("token");
    this.test=jwt_decode(localStorage.getItem("token"));
    this.profileService.userData(this.test.id).then((result:any)=>{
      this.jwtData=result.data;
    });
  }
  deleteUser(_id:string)
 {
  Confirm.show(
    'Delete',
    'Do you want to delete this User?',
    'Yes',
    'No',
    () => {
      this.userService.deleteU(_id).then((data: any) => {
        if (data.status === 200) {
          Notify.success(data.message,{
            position:'center-top'
          });
          this.showUser();
        }
        else{
          Notify.warning(data.message,{
            position:'center-top'
          });
        }
      })
    },
    () => {
      Notify.info("Not Deleted",{
        position:'center-top'
      });
    },
    {
    },
  );
 }
    showUser()
    {
    this.userService.user().then((result:any)=>{
        this.userInfo=result.data;
        this.userInfo.map((e: any) => {
          e['image'] = e.image ? `http://localhost:5000/images/userImage/${e.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
          e["dob"] =   new Date(e.dob).toLocaleDateString();
        });
      }).catch(err=>{
        console.log(err)
      })
    } 
    addCategories()
    {
      this.router.navigateByUrl('/user');
    }
}


