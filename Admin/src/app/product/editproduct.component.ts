import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: '../product/editproduct.component.html',
  styleUrls:['../product/editproduct.component.css']
})
export class editProduct implements OnInit {
     productnameEdit = "";
     productBarcode = "";
     productPrice = "";
     productQuantity = "";
     productImage ="";
     productDescription = "";
    id :any="";
    status:any;
    product:any;
    constructor(private productService: ProductService,private loginService: LoginService, private router:Router, private activatedRoute: ActivatedRoute) { 
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
  getProductById()
  {
      return this.productService.products.filter((product:any)=>product.idproduct===this.id)[0];
  }
  updateProduct(newProduct)
    {
        console.log("from component");
        console.log(newProduct.name);
         this.productService.updateProduct(newProduct.idproduct,newProduct.name,newProduct.barcode,newProduct.price,newProduct.quantity,newProduct.image,newProduct.description,newProduct.status);
         this.router.navigate(['products/list']); 
    }
}