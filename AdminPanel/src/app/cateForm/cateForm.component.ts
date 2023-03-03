import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'app/services/categorie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomvalidationService } from 'app/validation/customvalidation.service';

@Component({
  selector: 'app-cateForm',
  templateUrl: './cateForm.component.html',
  styleUrls: ['./cateForm.component.css']
})
export class CateFormComponent implements OnInit {
  id: any;
  submitted = false;
  idData: any = '';
  isAdd: boolean;
  constructor(private toastr: ToastrService,private customValidator: CustomvalidationService, private cateService: CategorieService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')

    });
    this.isAdd = !this.id
    if (!this.isAdd) {
      this.cateService.EditC(this.id).then((data) => {
        const Editcat = {
          cname:data['data']['cate_name']
        }
        this.addCate.patchValue(Editcat)
      })
    }
  }

  ngOnInit() {
  }

  public validationMessages = {
    'cname': [
      { type: 'required', message: 'Categories Name is required' },
      {type: 'pattern', message: 'Please Enter a valid Categories Name is required'}
    ]
  };

  addCate = new FormGroup({
    cname: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z]+$')]),
  });
  newCate() {
    this.submitted = true;
    if(this.addCate?.invalid)
    {
      return
    }
    if (this.isAdd) {
      this.cateAdd()
    } else {
      this.cateUpdate();
    }

  }

  cateAdd() {
    this.cateService.cate(this.addCate.value).then((result: any) => {
      if (result.status == 200) {
        this.toastr.success('Success', result.message);
        this.router.navigateByUrl('/categorieslist');
        this.submitted = false;
      }
      else if (result.status == 401) {
        this.toastr.info('Warning', result.message);
      }
      else {
        this.toastr.error('Error', result.message);
      }
    }).catch(err => {
      this.toastr.error('Error!', 'Toastr fanger!');
      console.log(err)
    })
  }
  cateUpdate() {
  
    this.cateService.updateC(this.addCate.value, this.id).then((result: any) => {
      if (result.status == 200) {
        this.toastr.success('Success', result.message);
        this.router.navigateByUrl('/categorieslist');
        this.submitted = false;
      }
    }).catch(err => {
      this.toastr.error('Error!', 'Toastr fanger!');
      console.log(err)
    })
  }
}

