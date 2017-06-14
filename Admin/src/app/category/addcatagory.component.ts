import { Component, OnInit } from '@angular/core';
import { CatService } from '../services/catagory.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
    selector: 'category',
    templateUrl: './addcatagory.component.html'
})
export class AddCatagory {
    name: string = '';
    description: any = '';
    categoryImage: string = '';
    newCategory: any = {};
    image:any;

    path = '';

    public file_srcs: string[] = [];

    public debug_size_before: string[] = [];

    public debug_size_after: string[] = [];
    constructor(private catservice: CatService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit() {
       // this.loginService.checkCredentials();
    }
    
 



    Addcatagory() {
        console.log(this.name);
        this.newCategory = {
            "name": this.name,
            "idsupercategory": null,
            "status": 1,
            "categorydesc": this.description,
            "image": "image"
        }
        console.log(this.newCategory);
        this.catservice.addCatagory(this.newCategory);
        this.router.navigate(['/catagory/list']);
    }
}
