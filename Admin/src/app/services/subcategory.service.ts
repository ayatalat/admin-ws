
import { Injectable } from "@angular/core";
import { Http, Response, Request } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class SubcategoryService {
   

   public subCategories=[];
   private name:string;
   subcategoryurl="http://localhost:3000/subCategories"
   categoryurl= "http://localhost:3000/Categories"
       producturl = "http://localhost:3000/products";

    constructor(private http: Http) {
        this.getAllSubcategory();
    }


getAllSubcategory() {
        return this.http.get(this.subcategoryurl).map((response: Response) => response.json())
            .subscribe(data => {
                this.subCategories = data
            },
            err => console.log(`error happened getting categories ${err}`)
            );
    }
    get subcategories() {
        return this.subCategories;
    }
     getcategorybyid(id){
            return this.http.get(this.categoryurl+"/"+id).map((response: Response) => response.json())
            .subscribe(data => {
                console.log(data);
                  this.name=data
            },
            err => console.log(`error happened getting categories ${err}`)
            );
     }
    //  get namecategory(){
    //      return this.name;
    //  }
    addsubcategory(subcategory){
        this.http.post(this.subcategoryurl, subcategory).map((response: Response) => response.json())
                .subscribe(
                data => {
                    this.subCategories.push(data);
                },
                (err) => console.log(`errror ${err}`)
                )
    }
     EditsubCategory(id:number,name:string,desc:string,idsuper) {
        if ( name != "") {
            let newsubcatagory = {
                "name":name,
                 "categorydesc":desc,
                 "status":1,
                "image":"image",
                "idsupercategory":idsuper
            }
            this.http.put(this.subcategoryurl+"/"+id, newsubcatagory).map((response: Response) => response.json())
                .subscribe(
                data => {
                    this.getAllSubcategory();
                    console.log(data);
                },
                (err) => console.log(`errror ${err}`)
                )
        }

    }
    
     updateproductbycategoryId(oldidcategory: number, newidcategory: number) {
        return this.http.put(this.producturl + "/" + oldidcategory + "/" + newidcategory, oldidcategory, newidcategory).map((response: Response) => response.json())
            .subscribe(
            date => {
                console.log((date));
            },
            (err) => console.log(`error ${err}`)
            )
    }
    deletesubcategory(id: number) {
        this.http.delete(this.subcategoryurl + "/" + id).map((response: Response) => response.json())
            .subscribe(
            date => {
                this.getAllSubcategory();
            },
            (err) => console.log(`error ${err}`)
            )
    }
}
