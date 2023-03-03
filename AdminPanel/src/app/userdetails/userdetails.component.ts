import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserDetailsComponent implements OnInit {

  jwtData:any;
    test:any;
  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    localStorage.getItem("token");
        this.test=jwt_decode(localStorage.getItem("token"));
        this.profileService.userData(this.test.id).then((result:any)=>{
        this.jwtData=result.data;
         this.jwtData['image'] = this.jwtData.image ? `http://localhost:5000/images/userImage/${this.jwtData.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        });
  }

}
