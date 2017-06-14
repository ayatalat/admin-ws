import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LoginService } from '../services/login.service';
import { SubcategoryService } from "../services/subcategory.service";

import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: '../product/addproduct.component.html',
  styleUrls: ['../product/addproduct.component.css']
})
export class AddProduct {
  productName = "";
  productBarcode = "";
  productPrice = "";
  productQuantity = "";
  productImage = "";
  productDescription = "";
  selectedoption = "";
  subCategory:any;
  constructor(private subcatservice: SubcategoryService, private loginService: LoginService, private productService: ProductService, private router: Router) {

  }
  ngOnInit(){
        this.loginService.checkCredentials();
    }
  onChange(newValue) {
    console.log(newValue);
    this.selectedoption = newValue;
    console.log(newValue);
    
  }
  addProduct() {
    if (this.productName != "") {
      console.log("in component");
      console.log(this.productName);
      this.subCategory = this.subcatservice.subCategories.filter((subcatagory: any) => subcatagory.name == this.selectedoption);
      console.log("with",this.subCategory[0].idcategory);
      this.productService.addProduct(this.productName, this.productBarcode, this.productPrice, this.productQuantity,this.productImage, this.productDescription,this.subCategory[0].idcategory);
      this.router.navigate(['products/list']);
    }
  }
  ListsubCategory() {
     
       return this.subcatservice.subCategories;
    }
}