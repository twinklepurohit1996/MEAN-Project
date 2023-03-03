import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TestimonialComponent } from '../../testimonial/testimonial.component';
import { CategoriesListComponent } from '../../categorieslist/categorieslist.component';
import { CateFormComponent } from '../../cateForm/cateForm.component';
import { ItemlistComponent } from '../../itemlist/itemlist.component';
import { ItemFormComponent } from '../../itemForm/itemForm.component';
import { UserDetailsComponent } from '../../userdetails/userdetails.component';
import { ContactusComponent } from 'app/contactus/contactus.component';
import { BlogComponent } from 'app/blog/blog.component';
import { BlogFormComponent } from 'app/blog-form/blog-form.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserComponent },

    { path: 'testimonial', component: TestimonialComponent },
    
    { path: 'categorieslist', component: CategoriesListComponent },
    { path: 'cateForm', component: CateFormComponent },
    { path: 'cateForm/:id', component: CateFormComponent },


    { path: 'itemlist', component: ItemlistComponent },
    { path: 'itemForm', component: ItemFormComponent },
    { path: 'itemForm/:id', component: ItemFormComponent },

    { path: 'contactus', component: ContactusComponent },

    {path:'blog',component:BlogComponent},
    { path: 'addblog', component: BlogFormComponent },
    { path: 'addblog/:id', component: BlogFormComponent },

    { path: 'userdetails', component: UserDetailsComponent },
];

