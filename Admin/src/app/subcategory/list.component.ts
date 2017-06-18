import { Component, OnInit  } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SubcategoryService } from "../services/subcategory.service";
import { CatService } from '../services/catagory.service';


@Component({
    selector: 'subcategory',
    templateUrl: './list.component.html'
})
export class listsubcategory {
    selectedoption;
    categoryid;
    subcategories;
    selectedcategory;
    constructor(private catservice:CatService,private subcatservice:SubcategoryService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit(){
        this.loginService.checkCredentials();
    }
    ListsubCategory() {
       return this.subcatservice.subCategories;
        
    }
   getCatName(id){
    return this.subcatservice.getcategorybyid(id);
   }
    ListCategory() {
        return this.catservice.categories
    }
     onChange(newValue) {
        console.log(newValue);
        this.selectedoption = newValue;
        console.log( this.selectedoption);
       this.selectedcategory= this.catservice.catagories.filter((category:any)=> category.name==this.selectedoption);
       this.categoryid=this.selectedcategory[0].idcategory;
      console.log("selected id",this.categoryid);
      this.subcatservice.getsubcategorybycategory(this.categoryid);

     }
}
