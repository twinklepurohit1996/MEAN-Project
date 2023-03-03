import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoRefeshService } from '../services/auto-refesh.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit {

  id: any;
  itemInfo: any;
  isData: boolean;
  reloading=false;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private refeshService: AutoRefeshService, private router: Router) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log('this.id = '  + this.id);
      this.showItem();
    });
  }

  showItem(){
    
    this.itemService.getItem(this.id).then((result: any) => {
      console.log(result);
      console.log(result.data);
      this.itemInfo = result.data;
      this.itemInfo.map((e: any) => {
        e['file'] = e.file ? `http://localhost:5000/images/itemImage/${e.file}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
      });
    }).catch(err => {
      console.log(err)

    });
  }
  getPath(){
    return this.router.url;
  }
}
