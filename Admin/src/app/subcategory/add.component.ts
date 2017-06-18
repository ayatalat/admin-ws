import { Component, OnInit, ElementRef } from '@angular/core';
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
    URL = 'https://storewebservice.herokuapp.com/';
    selectedoption: string;
    newcategory: any;
    newsubcategory: any;
    name: string = '';
    description: any = '';
    imageurl='';
    constructor(private el: ElementRef,private subcatservice: SubcategoryService, private catservice: CatService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit() {
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
            "image":this.imageurl,
            "status":1
        }
        console.log(this.newsubcategory);
        this.subcatservice.addsubcategory(this.newsubcategory);
        this.router.navigate(['/subcategory/list']);
    }
}