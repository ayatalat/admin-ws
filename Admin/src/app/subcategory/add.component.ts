import { Component, OnInit } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SubcategoryService } from "../services/subcategory.service";
import { CatService } from '../services/catagory.service';



@Component({
    selector: 'addcategory',
    templateUrl: './add.componet.html'
})
export class AddsubCatagory {
    selectedoption: string;
    newcategory: any;
    newsubcategory: any;
    name: string = '';
    description: any = '';
    constructor(private subcatservice: SubcategoryService, private catservice: CatService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit() {
        this.loginService.checkCredentials();
    }
    onChange(newValue) {
        console.log(newValue);
        this.selectedoption = newValue;
        console.log(this.selectedoption);
        this.getCatebyName();

    }
    ListCategory() {
        return this.catservice.catagories;
    }

    getCatebyName() {
        this.newcategory = this.catservice.categories.filter((catagory: any) => catagory.name == this.selectedoption);
        console.log(this.newcategory);
    }
    Addsubcatagory() {
        this.newsubcategory={
            "name":this.name,
            "categorydesc":this.description,
            "idsupercategory":this.newcategory[0].idcategory,
            "image":"image",
            "status":1
        }
        console.log(this.newsubcategory);
        this.subcatservice.addsubcategory(this.newsubcategory);
        this.router.navigate(['/subcategory/list']);
    }
}