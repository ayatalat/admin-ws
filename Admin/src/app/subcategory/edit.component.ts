import { Component, OnInit } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { LoginService } from '../services/login.service';
import { SubcategoryService } from "../services/subcategory.service";
import { CatService } from '../services/catagory.service';




@Component({
    selector: 'subcategory',
    templateUrl: './edit.component.html'
})
export class EditsubCatagory {

    private sub: any;
    id: number;
    selectedoption: string;
    newcategory:any;
    constructor(private catservice:CatService,private subcatservice:SubcategoryService, private loginService: LoginService, private http: Http, private router: ActivatedRoute,private route:Router) {
    }
    ngOnInit() {
        //this.loginService.checkCredentials();
        this.sub = this.router.params.subscribe(params => {
            this.id = +params['id'];
            console.log(this.id);
        });
    }
    ListCategory() {
        return this.catservice.categories;
    }
    onChange(newValue) {
        console.log(newValue);
        this.selectedoption = newValue;
        console.log( this.selectedoption);
        this.getCatebyName();
       
    }
    getCatebyName(){
    this.newcategory=this.catservice.categories.filter((catagory: any) => catagory.name == this.selectedoption);
    }
    EditsubCatagory(name:string,desc:string) {
        this.subcatservice.EditsubCategory(this.id, name,desc,this.newcategory[0].idcategory);
       this.route.navigate(['/subcategory/list'])

    }
   
  

}