import { Component, OnInit } from '@angular/core';
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

    private sub: any;
    id: number;
    category: any =[];
    constructor(private catservice: CatService, private loginService: LoginService, private http: Http, private router: ActivatedRoute, private route: Router) {
    }
    ngOnInit() {
        // this.loginService.checkCredentials();
        this.sub = this.router.params.subscribe(params => {
            this.id = +params['id'];
            console.log(this.id);
               

        });
    }

    
    EditCatagory(name: string, desc: string) {
        this.catservice.EditCatagory(this.id, name, desc);
        this.route.navigate(['/catagory/list'])

    }



}