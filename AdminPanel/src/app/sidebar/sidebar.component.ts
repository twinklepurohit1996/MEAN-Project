import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ProfileService } from 'app/services/profile.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'User List',  icon: 'pe-7s-graph', class: '' },
    { path: '/contactus', title: 'Contact Us',  icon:'pe-7s-note2', class: '' },
    { path: '/categorieslist', title: 'Cateogries List',  icon:'pe-7s-news-paper', class: '' },
    { path: '/itemlist', title: 'Item Lists',  icon:'pe-7s-map-marker', class: '' },
    { path: '/blog', title: 'Blog List',  icon:'pe-7s-map-marker', class: '' },
    { path: '/testimonial', title: 'Testimonial',  icon:'pe-7s-map-marker', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  test:any;
  jwtData:any;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    localStorage.getItem("token");
        this.test=jwt_decode(localStorage.getItem("token"));
        this.profileService.userData(this.test.id).then((result:any)=>{
        console.log(result.data)
        this.jwtData=result.data;
        this.jwtData['image'] = this.jwtData.image ? `http://localhost:5000/images/userImage/${this.jwtData.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        console.log(this.jwtData);
        });
  }
  logout()
  {
    localStorage.removeItem("token");
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  
}
