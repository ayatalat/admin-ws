
import { Injectable } from "@angular/core";
import { Http, Response, Request } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CatService {
    public catagories: any = [];
    name: string;
    categoryUrl = "https://storewebservice.herokuapp.com/categories";
    producturl = "https://storewebservice.herokuapp.com/products";
    constructor(private http: Http) {
        this.getAllCat();
    }

    getAllCat() {
        return this.http.get(this.categoryUrl).map((response: Response) => response.json())
            .subscribe(data => {

                this.catagories = data
            },
            err => console.log(`error happened getting categories ${err}`)
            );
    }
    get categories() {
        return this.catagories;
    }
    addCatagory(category) {
        this.http.post(this.categoryUrl, category).map((response: Response) => response.json())
            .subscribe(
            data => {
                this.catagories.push(data);
            },
            (err) => console.log(`errror ${err}`)
            )
    }
    getcategorybyid(id) {
        return this.http.get(this.categoryUrl+"/"+ id).map((respone:Response)=>respone.json())
    }

    EditCatagory(id: number, name: string, desc: string,image:string) {
        if (name != "") {
            let newcatagory = {
                "name": name,
                "categorydesc": desc,
                "status": 1,
                "image": image
            }
            this.http.put(this.categoryUrl + "/" + id, newcatagory).map((response: Response) => response.json())
                .subscribe(
                data => {
                    this.getAllCat();
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
    deletecategory(id: number) {
        this.http.delete(this.categoryUrl + "/" + id).map((response: Response) => response.json())
            .subscribe(
            date => {
                this.getAllCat();
            },
            (err) => console.log(`error ${err}`)
            )
    }
}
