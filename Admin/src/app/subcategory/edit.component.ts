import { Component, OnInit,ElementRef } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { LoginService } from '../services/login.service';
import { SubcategoryService } from "../services/subcategory.service";
import { CatService } from '../services/catagory.service';





@Component({
    selector: 'edit-subcategory',
    templateUrl: './edit.component.html'
})
export class EditsubCatagory {
    URL = 'https://storewebservice.herokuapp.com/';
    private sub: any;
    id: number;
    selectedoption: string;
    newcategory:any;
    supCategory: any = [];
    imageurl='';
    constructor(private el: ElementRef, private catservice:CatService,private subcatservice:SubcategoryService, private loginService: LoginService, private http: Http, private router: ActivatedRoute,private route:Router) {
     console.log("category",this.catservice.categories);
}
    ngOnInit() {
       this.loginService.checkCredentials();
        this.sub = this.router.params.subscribe(params => {
            this.id = +params['id'];
            console.log("id",this.id);
            // console.log(this.getSupCategoryById());
            // // this.supCategory = this.getSupCategoryById();
            // // console.log("name",this.supCategory.name);
        });
    }
//     getSupCategoryById()
//   {
//       return this.catservice.categories.filter((subCategory:any)=>subCategory.idsupercategory==this.id)[0];
//   }

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
    ListCategory() {
        return this.catservice.categories
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
        this.route.navigate(['/subcategory/list']);
    

    }
   
  

}