import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { SubcategoryService } from "../services/subcategory.service";

@Component({
  selector: 'app-product',
  templateUrl: '../product/product.component.html',
  styleUrls:['../product/product.component.css']
})
export class Product {
   selectedoption;
   subCategory;
   subcategoryid;
    constructor(private subcatservice:SubcategoryService,private productService: ProductService, private loginService: LoginService, private router:Router) { 
      this.getProducts();
     
  }
  ngOnInit(){
       this.loginService.checkCredentials();
    }
  getProducts()
  {
    
   return this.productService.products;
  }
  removeProduct(removeid:any)
  {
    console.log(removeid);
     this.productService.removeProduct(removeid);
    this.router.navigate(['products/list']);

  }
   ListsubCategory() {
       return this.subcatservice.subCategories;
    }
      
  onChange(newValue) {
    console.log(newValue);
    this.selectedoption = newValue;
    console.log(newValue);
    this.subCategory = this.subcatservice.subCategories.filter((subcatagory: any) => subcatagory.name == this.selectedoption);
    this.subcategoryid=this.subCategory[0].idcategory;
    console.log("with",this.subCategory[0].idcategory);
     this.getcategeryproduct();
    
  }

  getcategeryproduct(){
    console.log(this.productService.getproductbycategoryid(this.subcategoryid));
  }
}