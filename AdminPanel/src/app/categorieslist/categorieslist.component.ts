import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: ['./categorieslist.component.css']
})
export class CategoriesListComponent implements OnInit {
  cateData:any;
  editData:any
  _id:any;
    constructor(private cateService: CategorieService,private toastr: ToastrService,private router: Router ,private route:ActivatedRoute) { 
      
    }
  ngOnInit() {
    this.showCate();
  }

 showCate()
 {
    this.cateService.showC().then((result:any)=>{
        this.cateData=result.data;
      }).catch(err=>{
        console.log(err)
      })
 }
 deleteCate(_id:string)
 {
  Confirm.show(
    'Delete',
    'Do you want to delete this Categories?',
    'Yes',
    'No',
    () => {
      this.cateService.deleteC(_id).then((data: any) => {
        if (data.status === 200) {
          Notify.success(data.message,{
            position:'center-top'
          });
          this.showCate();
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


 EditCate(_id:string)
 {
  this.cateService.EditC(_id).then((result:any)=>{
    if(result.status==200)
      {
        this.toastr.success('Success',result.message);
        this.editData=result.data;
        this.router.navigateByUrl('/categorieslist');
      }
  }).catch(err=>{
    console.log(err)
  })
 }
}



