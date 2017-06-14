import { Component, OnInit } from '@angular/core';
import { CatService } from '../services/catagory.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';

@Component({
    selector: 'category',
    templateUrl: './addcatagory.component.html'
})
export class AddCatagory {
    name: string = '';
    description: any = '';
    categoryImage: string = '';
    newCategory: any = {};
    image: any;

    uploadedFiles = [];
    uploadError;
    currentStatus: number;
    uploadFieldName = 'photos';

    readonly STATUS_INITIAL = 0;
    readonly STATUS_SAVING = 1;
    readonly STATUS_SUCCESS = 2;
    readonly STATUS_FAILED = 3;


    constructor(private _svc: FileUploadService, private catservice: CatService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit() {
         this.loginService.checkCredentials();
    }

    //---------------imagecode----------------//
    filesChange(fieldName: string, fileList: FileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
            .from(Array(fileList.length).keys())
            .map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
            });

        // save it
        this.save(formData);
    }
    reset() {
        this.currentStatus = this.STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
    }
    save(formData: FormData) {
        // upload data to the server
        this.currentStatus = this.STATUS_SAVING;
        this._svc.upload(formData)
            .take(1)
            .delay(1500) // DEV ONLY: delay 1.5s to see the changes
            .subscribe(x => {
                this.uploadedFiles = [].concat(x);
                this.currentStatus = this.STATUS_SUCCESS;
            }, err => {
                this.uploadError = err;
                this.currentStatus = this.STATUS_FAILED;
            })
    }


    //-------------------------------------//
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
