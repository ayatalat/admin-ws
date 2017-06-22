import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { SubcategoryService } from "../services/subcategory.service";

@Component({
  selector: 'app-removedProduct',
  templateUrl: '../product/retriveproduct.component.html',
 // styleUrls:['../product/retriveproduct.component.css']
})
export class RetriveRemovedProduct {
    selectedoption;
   subCategory;
   subcategoryid;
    constructor(private subcatservice:SubcategoryService,private productService: ProductService, private loginService: LoginService, private router:Router) { 
     this.getRemovedProducts();
  }
  ngOnInit(){
       this.loginService.checkCredentials();
    }
  getRemovedProducts()
  {
    
   return this.productService.removedProducts;
  }
  
}