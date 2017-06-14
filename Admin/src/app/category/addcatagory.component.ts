import { Component, OnInit, ElementRef } from '@angular/core';
import { CatService } from '../services/catagory.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';



@Component({
    selector: 'category',
    templateUrl: './addcatagory.component.html'
})
export class AddCatagory {
     URL = 'http://localhost:3000/';

    name: string = '';
    description: any = '';
    categoryImage: string = '';
    newCategory: any = {};
    image: any;
    imageurl='';
    public uploader: FileUploader = new FileUploader({ url:this.URL, itemAlias: 'photo' });


    constructor(private el: ElementRef, private catservice: CatService, private loginService: LoginService, private http: Http, private router: Router) {
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
  
    Addcatagory() {
        console.log(this.name);
        this.newCategory = {
            "name": this.name,
            "idsupercategory": null,
            "status": 1,
            "categorydesc": this.description,
            "image": this.imageurl
                }
        console.log(this.newCategory);
        this.catservice.addCatagory(this.newCategory);
        this.router.navigate(['/catagory/list']);
    }
}
