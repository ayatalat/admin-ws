import { Component, OnInit  } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CatService } from '../services/catagory.service';
import { ProductService } from '../services/product.service';
import { LoginService } from '../services/login.service';
import { SubcategoryService } from "../services/subcategory.service";


@Component({
    selector: 'detele-subcategory',
    templateUrl: './delete.component.html'
})
export class deleteComponent {
    public subcatagories: any = [];
    selectedoption: string;
    private sub: any;
    oldidsubcategory: number;
    products:any;
    newsubcategory:any;
    constructor(private subcatservice:SubcategoryService,private http: Http, private loginService: LoginService, private productservice: ProductService, private route: ActivatedRoute, private catservice: CatService, private router: Router) {

    }
    ngOnInit() {
      //  this.loginService.checkCredentials();
        this.sub = this.route.params.subscribe(params => {
            this.oldidsubcategory = +params['id'];
            console.log("old",this.oldidsubcategory);
        });
    }
    
    ListsubCategory() {
        return this.subcatservice.subcategories;
    }
    onChange(newValue) {
        console.log(newValue);
        this.selectedoption = newValue;
        console.log( this.selectedoption);
        this.getCatebyName();
    }
    getCatebyName(){
    this.newsubcategory=this.subcatservice.subcategories.filter((subcatagory: any) => subcatagory.name == this.selectedoption);
    }
    deletesubCatagory(){
        console.log("old",this.oldidsubcategory);
        console.log("new",this.newsubcategory[0].idcategory);
        this.subcatservice.updateproductbycategoryId(this.oldidsubcategory,this.newsubcategory[0].idcategory);
        this.subcatservice.deletesubcategory(this.oldidsubcategory);
        console.log('done');
        this.router.navigate(['/subcategory/list']);
    }
}
