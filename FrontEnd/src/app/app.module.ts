import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { ShowBlogComponent } from './show-blog/show-blog.component';
import { SingleBlogDisplayComponent } from './single-blog-display/single-blog-display.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgRatingBarModule } from 'ng-rating-bar';
import { ItemDisplayComponent } from './item-display/item-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ShowBlogComponent,
    SingleBlogDisplayComponent,
    FeedbackComponent,
    ItemDisplayComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgRatingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
