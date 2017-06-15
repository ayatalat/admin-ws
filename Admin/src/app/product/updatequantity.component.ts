import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: '../product/updatequantity.component.html',
  styleUrls:['../product/updatequantity.component.css']
})
export class UpdateQuantity implements OnInit {

     productQuantity = ""; 
     id :any="";
     status:any;
     product:any;
    constructor(private productService: ProductService,private loginService: LoginService, private router:Router, private activatedRoute: ActivatedRoute) { 
  }
  ngOnInit() {
    // subscribe to router event
    this.loginService.checkCredentials();
    this.activatedRoute.params.subscribe((params: Params) => {
        console.log("params",params);
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
  
  updateQuantity(newProduct)
    {
        console.log("from component");
        console.log(newProduct.quantity);
        this.productService.updateProductQuantity(newProduct.idproduct,newProduct.quantity);
        this.router.navigate(['products/list']); 
    }
}
