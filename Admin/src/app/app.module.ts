import { LoginService } from './services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 import {RouterModule} from '@angular/router';

 	
import { AppComponent } from "./app.component";  
import { CatService } from "./services/catagory.service";
import { CatComponent } from "./category/category.component";
import { AddCatagory } from "./category/addcatagory.component";
import { EditCatagory } from "./category/editcatagory.component";
import { ProductService } from './services/product.service';
import { deleteComponent } from "./subcategory/delete.component";
import { Product } from './product/product.component';
import { AddProduct } from './product/addproduct.component';
import { editProduct } from './product/editproduct.component';
import { UpdateQuantity } from './product/updatequantity.component';
import { OrderComponent } from "./order/order.component";
import { OrderService } from "./services/order.service";
import { AdminComponent } from "./admin Component/admin.component";
import { AuthComponent } from "./login/login.component";
import { SubcategoryService } from "./services/subcategory.service";
import { listsubcategory } from "./subcategory/list.component";
import { AddsubCatagory } from "./subcategory/add.component";
import { EditsubCatagory } from "./subcategory/edit.component";
import { UserService } from "./services/user.service";
import { UserComponent } from "./user/user.componet";
import { showsingleorderComponent } from "./order/showorder.component";
import { OrderDetails } from "app/order/orderdetails.component";

@NgModule({
  declarations: [
    AppComponent,
    CatComponent,
    AddCatagory,
    EditCatagory,
   deleteComponent,
    OrderComponent ,
    Product,
    AddProduct,
    editProduct,
    UpdateQuantity,
    AuthComponent,
    listsubcategory,
    AddsubCatagory,
    EditsubCatagory,
    UserComponent,
    showsingleorderComponent,
    OrderDetails,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,RouterModule.forRoot([
      {path:"home" ,component:Product},
      {path:"catagory/list" ,component:CatComponent},
      {path:"catagory/add",component:AddCatagory},
      {path:"catagory/edit/:id",component:EditCatagory},
      {path:"subcategory/delete/:id",component:deleteComponent},
      {path:"products/list" ,component:Product},
      {path:"products/add" ,component:AddProduct},
      {path:"products/edit/:id" ,component:editProduct},
      {path:"products/edit/quantity/:id" ,component:UpdateQuantity},
      {path: "orders/list", component:OrderComponent},
      {path:"orders/showorder/:id",component:showsingleorderComponent},
      {path: "login", component: AuthComponent },
      {path: '', component: Product },
      {path:'subcategory/list',component:listsubcategory},
      {path:'subcategory/edit/:id',component:EditsubCatagory},
      {path:'subcategory/add',component:AddsubCatagory},
        {path:'orders/orderdetails/:id',component:OrderDetails},
      {path:'users',component:UserComponent},
      {path: '**', component: Product }
    ])
  ],
  providers: [CatService,ProductService,OrderService,LoginService,SubcategoryService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
