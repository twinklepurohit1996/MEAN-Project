import { ViewportScroller } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Confirm, Notify } from 'notiflix';
import { BlogService } from '../services/blog.service';
import { ContactUsService } from '../services/contactus.service';
import { FeedbackService } from '../services/feedback.service';
import { debounceTime, fromEvent, map, tap } from 'rxjs';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  ratingCount = 5;
  value3 = 2;
 
  showScroll: boolean;
    showScrollHeight = 300;
    hideScrollHeight = 5;

  focus: any;
  focus1: any;
  submitted = false;
  blogInfo:any;
  showMore = false;
  feedData:any;
  placeholder="Choose a reason";
  stars: boolean[] ;
  constructor(private route:ActivatedRoute,private viewPortScroll:ViewportScroller,private blogService:BlogService,private router:Router,private contactusService:ContactUsService,private feedbackService:FeedbackService) { 
    this.route.fragment.subscribe((fragment: string) => {
      console.log("My fragment is here => ", fragment)
      this.viewPortScroll.scrollToAnchor(fragment);
  })
  }

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
  
  ngOnInit() {
    
this.showBlog();
this.showFeedback();
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

  getPath(){
    return this.router.url;
  }


  public validationMessages = { 
    'name': [
    { type: 'required', message: 'Name is required' },
    { type: 'pattern', message: 'Please Enter valid User Name' }], 
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' }],
    'message': [
      { type: 'required', message: 'Message is required' },
      { type: 'pattern', message: 'Please Enter valid Proper Message' }],
      'title': [
        { type: 'required', message: 'title is required' }],
    }
    contactForm = new FormGroup(
      {
        name:new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z].*[\s\.\0-9]*$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9].*[\s\.]*$')]),
        title: new FormControl('',[Validators.required])
    });

    contactUser()
    {
      this.submitted = true;
      if(this.contactForm.invalid){
        return
      }
      console.warn(this.contactForm.value);
      this.contactusService.contactUs(this.contactForm.value).then((result: any) => {
        if (result.status == 200) {
          Notify.success('Success', result.message);
          this.submitted = false;
        }
        else if (result.status == 401) {
          Notify.warning('Already Send', result.message);
        }
        else
        {
          Notify.failure('Failure', result.message);
        }
      }).catch(err => {
        Notify.failure('Error');
        console.log(err)
      });

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

    showFeedback()
    {
      this.feedbackService.showB().then((result:any)=>{
        console.log("Hello");
        console.log(result.data);
        this.feedData=result.data;
        this.feedData.map((e: any) => {
          e['user_Id']['image'] = e.user_Id.image ? `http://localhost:5000/images/userImage/${e.user_Id.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        });
        console.log(this.feedData)        
      }).catch(err=>{
        console.log(err)
      })
    }
  
}
