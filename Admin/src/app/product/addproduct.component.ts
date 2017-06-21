import { Component, OnInit,ElementRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LoginService } from '../services/login.service';
import { Http, Response, Request } from '@angular/http';

import { SubcategoryService } from "../services/subcategory.service";

import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: '../product/addproduct.component.html',
  styleUrls: ['../product/addproduct.component.css']
})
export class AddProduct {
    URL = 'https://storewebservice.herokuapp.com/';
  productName = "";
  productBarcode = "";
  productPrice = "";
  productQuantity = "";
  productImage = "";
  productDescription = "";
  selectedoption = "";
  subCategory:any;
  imageurl='';
  constructor(private http:Http,private el: ElementRef,private subcatservice: SubcategoryService, private loginService: LoginService, private productService: ProductService, private router: Router) {

  }
  ngOnInit(){
        this.loginService.checkCredentials();
    }
        upload() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { 
            formData.append('photo', inputEl.files.item(0));

            this.http.post(this.URL, formData).map((res: Response) => res.json()).subscribe(    
                (data) => {
                    console.log(data)
                    this.imageurl=this.URL+data
                    console.log("image url ",this.imageurl);
                },
                (error) => alert(error))
        }
    }
  
  onChange(newValue) {
    console.log(newValue);
    this.selectedoption = newValue;
    console.log(newValue);
    
  }
  addProduct() {
    if (this.productName != "" && this.productPrice !="" && this.productQuantity !="" && this.productDescription !="") {
      console.log("in component");
      console.log(this.productName);
      this.subCategory = this.subcatservice.subCategories.filter((subcatagory: any) => subcatagory.name == this.selectedoption);
      console.log("with",this.subCategory[0].idcategory);
      this.productService.addProduct(this.productName, this.productBarcode, this.productPrice, this.productQuantity,this.imageurl, this.productDescription,this.subCategory[0].idcategory);
      this.router.navigate(['products/list']);
    }
    else
    {
      alert ("please enter valied data")
    }
  }
  ListsubCategory() {
     
       return this.subcatservice.subCategories;
    }
}