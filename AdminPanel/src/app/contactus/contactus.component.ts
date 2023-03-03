import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactUsService } from 'app/services/contact-us.service';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  titleData:any;
  emailData:any;
  userInfo:any;
  emailList:any;
  value: any;
  constructor(private contactUsService: ContactUsService) { }

  ngOnInit(): void {
    this.showContact();
  }

  


  filterForm = new FormGroup({
    search:new FormControl('')
  });



  showContact()
    {
    this.contactUsService.contactShow(this.filterForm.value).then((result:any)=>{
        this.userInfo=result.data;
      }).catch(err=>{
        console.log(err)
      })
    } 
    deleteContact(_id:string){
      Confirm.show(
        'Delete',
        'Do you want to delete this Contact Request?',
        'Yes',
        'No',
        () => {
          this.contactUsService.deleteC(_id).then((data: any) => {
            if (data.status === 200) {
              Notify.success(data.message,{
                position:'center-top'
              });
              this.showContact();
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
}
