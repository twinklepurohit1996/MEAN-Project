import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthanicationService } from 'app/services/authanication.service';
import { CategorieService } from 'app/services/categorie.service';
import { FeedbackService } from 'app/services/feedback.service';
import { CustomvalidationService } from 'app/validation/customvalidation.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Confirm, Notify } from 'notiflix';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  feedbackData: any;
  lastAction: boolean;
  feedData:any;
  constructor(private feedbackService: FeedbackService,private fb: FormBuilder) { }
  ngOnInit() {
    this.showFeedback();

  }
  
  showFeedback() {
    this.feedbackService.showF().then((result: any) => {
      this.feedbackData = result.data;
    }).catch(err => {
      console.log(err)
    })
  }

  deleteFeedback(_id: string) {
    Confirm.show(
      'Delete',
      'Do you want to delete this Feedback?',
      'Yes',
      'No',
      () => {
        this.feedbackService.deleteF(_id).then((data: any) => {
          if (data.status === 200) {
            Notify.success(data.message, {
              position: 'center-top'
            });
            this.showFeedback();
          }
          else {
            Notify.warning(data.message, {
              position: 'center-top'
            });
          }
        })
      },
      () => {
        Notify.info("Not Deleted", {
          position: 'center-top'
        });
      },
      {
      },
    );
  }

  onChange(event:any,feedback:any,_id: string) {
    feedback.checked = !feedback.checked;
    this.lastAction =feedback.checked;
    this.feedbackService.active(_id,{lastAction:this.lastAction}).then((result: any) => {
     console.log(result);
    }).catch(err => {
      console.log(err)
    })
  }
}



























