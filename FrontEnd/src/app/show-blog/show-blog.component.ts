import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { BlogService } from '../services/blog.service';
@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.css']
})
export class ShowBlogComponent implements OnInit {
  blogInfo: any;
  showScroll: boolean;
    showScrollHeight = 300;
    hideScrollHeight = 5;
  constructor(private blogService:BlogService,private router:Router) { }
  @HostListener('window:scroll', [])
  onWindowScroll() 
  {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) 
    {
        this.showScroll = true;
    } 
    else if ( this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) 
    { 
      this.showScroll = false; 
    }
  }
  ngOnInit(): void {
    this.showBlog();
  }

  scrollToTop() 
  { 
    (function smoothscroll() 
    { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; 
      if (currentScroll > 0) 
      {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  showBlog()
  {
  this.blogService.blogData().then((result:any)=>{
      this.blogInfo=result.data;
      this.blogInfo.map((e: any) => {
        e['image'] = e.image ? `http://localhost:5000/images/blogImage/${e.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
      });
    }).catch(err=>{
      console.log(err)
    })
  } 

  getPath(){
    return this.router.url;
  }
}
