import { Component, OnInit, ElementRef } from '@angular/core';
import { CatService } from '../services/catagory.service';
import { Http, Response, Request } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';



@Component({
    selector: 'category',
    templateUrl: './editcatagory.component.html'
})
export class EditCatagory {
    URL = 'https://storewebservice.herokuapp.com/';
    imageurl = '';
    private sub: any;
    id: number;
    category: any = [];
    catname='';
    descr='';
    error=false;
    constructor(private el: ElementRef, private catservice: CatService, private loginService: LoginService, private http: Http, private router: ActivatedRoute, private route: Router) {
    }
    ngOnInit() {
        this.loginService.checkCredentials();
        this.sub = this.router.params.subscribe(params => {
            this.id = +params['id'];
            console.log(this.id);
            this.category = this.getCategoryById();
            console.log(this.category);

        });
    }
    getCategoryById() {
        return this.catservice.categories.filter((category: any) => category.idcategory === this.id)[0];
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
                    this.imageurl = this.URL + data
                    console.log("image url ", this.imageurl);
                },
                (error) => alert(error))
        }
    }



    EditCatagory(name: string, desc: string,image:any) {
        if (name != '' && desc != '' && image !='') {
            console.log("vaid")
           
           this.catservice.EditCatagory(this.id, name, desc, this.imageurl);
           this.route.navigate(['/catagory/list'])
        }else{
            console.log("incroorect");
            this.error=true;
            
        }


    }



}