import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  file: File = null;
  submitted = false;
  isAdd: boolean;
  id:any;
  constructor( private blogService:BlogService, private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
    });
    this.isAdd = !this.id
    if (!this.isAdd) {

      this.blogForm.get('file').clearValidators();

      this.blogService.EditB(this.id).then((data) => {
       
        const Editblog = {
          title:data['data']['title'],
          des:data['data']['des'],
          author:data['data']['author'],
        }
        this.blogForm.patchValue(Editblog);
      })
    }
  }

  ngOnInit(): void {
  }

  public validationMessages = {
    'title': [
      { type: 'required', message: 'Title is required' },
      { type: 'pattern', message: 'Please Enter a Valid Title Name' },],
    'des': [
      { type: 'required', message: 'Description is required' },
      { type: 'maxlength', message: 'Description maximum length 500' },
      { type: 'minlength', message: 'Description mimimum length 100' },
    ],
    'file': [
      { type: 'required', message: 'Image is required' }],
    'author': [
      { type: 'required', message: 'Author is required' },
      { type: 'pattern', message: 'Please Enter a Valid Author Name' },],
  }

  blogForm = new FormGroup(
    {
      title: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      des: new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(100)]),
      file: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
    });

      onFileSelected(event: any) {
        this.file = event.target.files[0];
    }

    public blog() {
      this.submitted = true;
      if(this.blogForm?.invalid)
      {
        return
      }
      if (this.isAdd) {
   
        this.blogAdd()
      } else {
        this.blogUpdate();
      }

      
      }
      blogAdd()
      {
        const data = this.blogForm.value;
        const fd = new FormData();
        fd.append('title', data.title);
        fd.append('file', this.file, this.file.name);
        fd.append('des', data.des);
        fd.append('author', data.author);
        this.blogService.blogadd(fd).then((result: any) => {
          if (result.status == 200) {
            Notify.success('Success', result.message);
            this.submitted = false;
            this.router.navigateByUrl('/blog');
          }
          else if (result.status == 400) {
            Notify.info('Warning', result.message);
          }
          else {
            Notify.failure('Error', result.message);
          }
        }).catch(err => {
          alert("Error Data")
          console.log(err)
        })
      }
      blogUpdate()
      {
        const data = this.blogForm.value;
        const fd = new FormData();
        fd.append('title', data.title);
        fd.append('des', data.des);
        fd.append('author', data.author);
        fd.append('file', this.file);

        this.blogService.updateB(fd,this.id).then((result: any) => {
              if (result.status == 200) {
                Notify.success('Success', result.message);
                this.router.navigateByUrl('/blog');
                this.submitted = false;
              }
            }).catch(err => {
              alert("Error Data")
              console.log(err)
            })
            
      }
    }

