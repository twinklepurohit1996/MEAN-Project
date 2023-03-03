import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  userInfo:any;
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.showBlog();
  }

  showBlog()
    {
    this.blogService.blogShow().then((result:any)=>{
        this.userInfo=result.data;
        this.userInfo.map((e: any) => {
          e['image'] = e.image ? `http://localhost:5000/images/userImage/${e.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        });
      }).catch(err=>{
        console.log(err)
      })
    } 
    deleteBlog(_id:string)
    {
     Confirm.show(
       'Delete',
       'Do you want to delete this Blog?',
       'Yes',
       'No',
       () => {
         this.blogService.deleteB(_id).then((data: any) => {
           if (data.status === 200) {
             Notify.success(data.message,{
               position:'center-top'
             });
             this.showBlog();
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
