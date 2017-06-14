import { Component, OnInit  } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SubcategoryService } from "../services/subcategory.service";

@Component({
    selector: 'subcategory',
    templateUrl: './list.component.html'
})
export class listsubcategory {
    constructor(private subcatservice:SubcategoryService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit(){
        //this.loginService.checkCredentials();
    }
    ListsubCategory() {
        return this.subcatservice.subCategories;
    }
   getCatName(id){
    return this.subcatservice.getcategorybyid(id);
   }
}
