import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-single-blog-display',
  templateUrl: './single-blog-display.component.html',
  styleUrls: ['./single-blog-display.component.css']
})
export class SingleBlogDisplayComponent implements OnInit {
  id:any;
  blogInfo: any;
  constructor(private blogService:BlogService, private route: ActivatedRoute,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
    });
    this.blogService.fetchSingleBlog(this.id).then((result:any) => {
      this.blogInfo=result.data;
      this.blogInfo['image'] = this.blogInfo.image ? `http://localhost:5000/images/blogImage/${this.blogInfo.image}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
    }).catch(err=>{
      console.log(err)

    });
   }
  ngOnInit(): void {
   
  }
  getPath(){
    return this.router.url;
  }
}
