import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup  , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'app/services/item.service';
import { CustomvalidationService } from 'app/validation/customvalidation.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-itemForm',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.css']
})
export class ItemFormComponent implements OnInit {

  id:any;
  submitted = false;
  file: File = null;
  isAdd: boolean;
  cateData:any;
  constructor(
    private customValidator: CustomvalidationService,
    private toastr: ToastrService,
    private router: Router,
    private route:ActivatedRoute,
    private itemService: ItemService,) {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id')
      });
      this.isAdd = !this.id
      if (!this.isAdd) {
        this.itemForm.get('file').clearValidators();
        this.itemService.EditI(this.id).then((data) => {
          const Editcat = {
            iname:data['data']['item_name'],
            des:data['data']['des'],
            price:data['data']['price'],
            qnty:data['data']['qnty'],
            cate_name:data['data']['cate_Id']['_id']
          }
          this.itemForm.patchValue(Editcat)
        })
      }
     }

  ngOnInit() {
    this.showCate();
  
  
  }

  public validationMessages = { 
    'iname': [
    { type: 'required', message: 'Item Name is required' },
    { type: 'invalidcate', message: 'Please Enter a valid Item Name' },], 
    'file': [
      { type: 'required', message: 'Item Image is required' }],
    'des': [
      { type: 'required', message: 'Item Name is required' },
    ],
    'price': [
      { type: 'required', message: 'Price is required' },
      { type: 'invalidprice', message: 'Price Must be a Number' },
      ],
    'qnty': [
      { type: 'required', message: 'Quantity is required' },
      { type: 'invalidprice', message: 'Quantity Must be a Number' },
      ]
    ,
    'cate_name': [
      { type: 'required', message: 'Categories Name is required' }],
  }
  itemForm = new FormGroup(
    {
      iname: new FormControl('', [Validators.required, Validators.compose([Validators.required, this.customValidator.patternValidatorCate()])]),
      file: new FormControl('', [Validators.required]),
      des: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.compose([Validators.required, this.customValidator.patternValidatorprice()])]),
      qnty: new FormControl('', [Validators.required, Validators.compose([Validators.required, this.customValidator.patternValidatorprice()])]),      
      cate_name: new FormControl(null, [Validators.required])
    });
  
    onFileSelected(event: any) {
      this.file = event.target.files[0];
    }
  showCate()
  {
    this.itemService.item().then((result:any)=>{
      this.cateData=result.data;
    }).catch(err=>{
      console.log(err)
    });
  }
  itemInsert(){

    this.submitted = true;
    if(this.itemForm?.invalid)
      {
        return
      }
    if (this.isAdd) {
      
      this.itemAdd()
    } else {
      this.itemUpdate();
    }

   
  }
  itemAdd(){
    const data=this.itemForm.value;
    const fd = new FormData();
    fd.append('file', this.file, this.file.name);
    fd.append('iname', data.iname);
    fd.append('des', data.des);
    fd.append('price', data.price);
    fd.append('qnty', data.qnty);
    fd.append('cate_Id', data.cate_name);
    this.itemService.itemInsert(fd).then((result:any)=>{
      if(result.status==200)
      {
        console.log(result);
        this.cateData=result.data;
        this.toastr.success('Success',result.message);
        this.router.navigateByUrl('/itemlist');
        this.submitted = false;
      }
      else if(result.status==401)
      {
        this.cateData=result.data;
        this.toastr.info('Warning',result.message);
      }
      else
      {
        this.toastr.error('Error', result.message);
      }
    }).catch(err=>{
        this.toastr.error('Error!', 'Toastr fanger!');
        console.log(err)
    })
  }

  itemUpdate(){
    const data=this.itemForm.value;
    console.log(data);
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('iname', data.iname);
    fd.append('des', data.des);
    fd.append('price', data.price);
    fd.append('qnty', data.qnty);
    fd.append('cate_Id', data.cate_name);
    this.itemService.updateI(fd,this.id).then((result: any) => {
          if (result.status == 200) {
            this.toastr.success('Success', result.message);
            this.router.navigateByUrl('/itemlist');
            this.submitted = false;
          }
        }).catch(err => {
          this.toastr.error('Error!', 'Toastr fanger!');
          console.log(err)
        });
  }
 
}
