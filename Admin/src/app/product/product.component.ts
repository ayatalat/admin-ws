import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SubcategoryService } from "../services/subcategory.service";

@Component({
  selector: 'app-product',
  templateUrl: '../product/product.component.html',
  styleUrls: ['../product/product.component.css']
})
export class Product {
  selectedoption;
  subCategory;
  subcategoryid;
  barcodes: any = [];

  constructor(private subcatservice: SubcategoryService, private productService: ProductService, private loginService: LoginService, private router: Router) {
    this.getProducts();
    console.log("get products", this.getProducts());
    //this.getBarcodes();
    //  console.log("get barcodes from constructor",this.getBarcodes());


  }
  ngOnInit() {
    this.loginService.checkCredentials();

  }
  getProducts() {
    this.barcodes = this.productService.products;
    console.log("barcodes aya", this.barcodes);
    return this.productService.products;
  }
  //getBarcodes()
  // {

  //   console.log("bar",this.barcodes);
  // }
  removeProduct(removeid: any) {
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
    this.subcategoryid = this.subCategory[0].idcategory;
    console.log("with", this.subCategory[0].idcategory);
    this.getcategeryproduct();

  }

  getcategeryproduct() {
    console.log(this.productService.getproductbycategoryid(this.subcategoryid));
  }
}