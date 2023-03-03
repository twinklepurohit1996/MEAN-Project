import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TestimonialComponent } from '../../testimonial/testimonial.component';
import { CategoriesListComponent } from '../../categorieslist/categorieslist.component';
import { CateFormComponent } from '../../cateForm/cateForm.component';
import { ItemlistComponent } from '../../itemlist/itemlist.component';
import { ItemFormComponent } from '../../itemForm/itemForm.component';
import { UserDetailsComponent } from '../../userdetails/userdetails.component';

import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TestimonialComponent,
    CategoriesListComponent,
    CateFormComponent,
    ItemlistComponent,
    ItemFormComponent,
    UserDetailsComponent
  ]
})

export class AdminLayoutModule {}
