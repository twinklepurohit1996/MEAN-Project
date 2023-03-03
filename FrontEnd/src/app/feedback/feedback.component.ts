import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { Confirm, Notify } from 'notiflix';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  submitted = false;
  focus: any;
  focus1: any;
  jwtData: any;
  test: any;
  constructor(private feedbackService: FeedbackService, private router: Router ) {
   
  }

  ngOnInit(): void {
    localStorage.getItem("token");
    this.test = jwt_decode(localStorage.getItem("token"));
  
  }

  public validationMessages = {
    'username': [
      { type: 'required', message: 'username is required' },
      { type: 'pattern', message: 'Please Enter valid User Name' }],
    'rating': [
      { type: 'required', message: 'Rating is required' },
      { type: 'pattern', message: 'Please enter a valid rating number between 0-5 only single number' }],
    'feedback': [
      { type: 'required', message: 'Message is required' },
      { type: 'pattern', message: 'Please Enter valid  Message Feedback' },
    {type:'maxlength',message:'maxmomum length is 100'}],
  }
  feedbackForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      rating: new FormControl('', [Validators.required, Validators.pattern('^([0-5]|1[5])$')]),
      feedback: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9].*[\s\.]*$'),Validators.maxLength(100)]),
    });

  feedback() {
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return
    }
    console.log(this.feedbackForm.value);
    const FeedbackData = this.feedbackForm.value
    FeedbackData['user_Id'] = this.test.id
    this.feedbackService.feedbackInsert(FeedbackData).then((result: any) => {
      if (result.status == 200) {
        Notify.success('Success', result.message);
        this.router.navigateByUrl('/landing');
        this.submitted = false;
      }
      else if (result.status == 401) {
        Notify.warning('Already Send', result.message);
        this.router.navigateByUrl('/landing');
      }
      else {
        Notify.failure('Failure', result.message);
      }
    }).catch(err => {
      Notify.failure('Error');
      console.log(err)
    });

  }
  getPath(){
    return this.router.url;
  }
}
