import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    jwtData:any;
    test:any;
    constructor(private authService:AuthServicesService, private router: Router) { }

    ngOnInit() {
        localStorage.getItem("token");
        this.test=jwt_decode(localStorage.getItem("token"));
        this.authService.userData(this.test.id).then((result:any)=>{
        this.jwtData=result.data;
        this.jwtData['image'] = this.jwtData.image ? `http://localhost:5000/images/userImage/${this.jwtData.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        });
  }
  getPath(){
    return this.router.url;
  }
    }
    


