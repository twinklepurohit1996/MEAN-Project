import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import {GuardsGuard} from './guards/guards.guard';
import { ShowBlogComponent } from './show-blog/show-blog.component';
import { SingleBlogDisplayComponent } from './single-blog-display/single-blog-display.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ItemDisplayComponent } from './item-display/item-display.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',  canActivate : [GuardsGuard],   component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',       component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'showBlog',          component: ShowBlogComponent },
    { path: 'showSingleBlog/:id',          component: SingleBlogDisplayComponent },
    { path: 'feedback',          component: FeedbackComponent },
    { path: 'itemDisplay/:id',          component: ItemDisplayComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    }),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 25], 
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
