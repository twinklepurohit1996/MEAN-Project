import { Component, OnInit } from '@angular/core';
import { ItemService } from 'app/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})

export class ItemlistComponent implements OnInit {
   itemData:any;
  ItemId:any;

  constructor(private itemService: ItemService,private toastr: ToastrService) { }

 
  ngOnInit() {
    this.showItem();
  }

  showItem()
  {
    this.itemService.showI().then((result:any)=>{
      this.itemData=result.data;
      this.itemData.map((e: any) => {
        e['file'] = e.file ? `http://localhost:5000/images/itemImage/${e.file}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
      });
    }).catch(err=>{
      console.log(err)
    })
  }

  deleteItem(_id:string)
 {
  Confirm.show(
    'Delete',
    'Do you want to delete this Item?',
    'Yes',
    'No',
    () => {
      this.itemService.deleteI(_id).then((data: any) => {
        if (data.status === 200) {
          Notify.success(data.message,{
            position:'center-top'
          });
          this.showItem();
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
