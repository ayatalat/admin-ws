import { Component, OnInit,ElementRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, Request } from '@angular/http';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: '../product/editproduct.component.html',
  styleUrls:['../product/editproduct.component.css']
})
export class editProduct implements OnInit {
URL = 'https://storewebservice.herokuapp.com/';
     productnameEdit = "";
     productBarcode = "";
     productPrice = "";
     productQuantity = "";
     productImage ="";
     productDescription = "";
    id :any="";
    status:any;
    product:any;
    imageurl='';
    constructor(private http:Http, private productService: ProductService, private el: ElementRef, private loginService: LoginService, private router:Router, private activatedRoute: ActivatedRoute) { 
  }
  ngOnInit() {
    // subscribe to router event
    this.loginService.checkCredentials();
    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = +params['id'];
        console.log(this.id);
        console.log(this.getProductById());      
        this.product = this.getProductById();          
      });
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
  getProductById()
  {
      return this.productService.products.filter((product:any)=>product.idproduct===this.id)[0];
  }
  
  updateProduct(newProduct)
    {
        console.log("from component");
        console.log(newProduct.name);
        
         this.productService.updateProduct(newProduct.idproduct,newProduct.name,newProduct.barcode,newProduct.price,newProduct.quantity,this.imageurl,newProduct.description,newProduct.status);
         this.router.navigate(['products/list']); 
    }
}