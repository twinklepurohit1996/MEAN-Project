import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Confirm, Notify } from 'notiflix';
import { AutoRefeshService } from '../../services/auto-refesh.service';
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    cateData:any;
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    isUserLoggedIn: boolean;
    constructor(public location: Location,private categories_Services:CategoriesService, private router: Router, private refeshService: AutoRefeshService) {
        this.refeshService.isUserLoggedIn.subscribe(value => {
            this.isUserLoggedIn = value;
        });
        if (localStorage.getItem("token")) {
            this.refeshService.isUserLoggedIn.next(true);
        }
    }


    ngOnInit() {
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.showCategories();

    }

    showCategories()
    {
        this.categories_Services.showCate().then((result:any)=>{
            this.cateData=result.data;
          }).catch(err=>{
            console.log(err)
          })

    }
   
    logout() {
        Confirm.show(
            'Delete',
            'Do you want to delete this Categories?',
            'Yes',
            'No',
            () => {
                console.warn("Logout Called");
                localStorage.removeItem("token");
                this.refeshService.isUserLoggedIn.next(false);
                this.router.navigateByUrl('/landing');
            }
        );





    }
   

}
