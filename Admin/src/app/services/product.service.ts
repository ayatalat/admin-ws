import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http, Response, Request } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    public removedProducts: any = [];
    public products: any = [];
    
    storeUrl = "https://storewebservice.herokuapp.com/products";
    constructor(private http: Http, private router: Router) {
        console.log('product service constructor');
        this.getProducts();
        this.getRemovedProduct();

    }
    getProducts(all: boolean = false) {
        return this.http.get(this.storeUrl).map((response: Response) => response.json())
            .subscribe(data => {
                this.products = data
                console.log("dad",data);
                console.log("pro",this.products);
            },
            err => console.log(`error happened getting products ${err}`)
            );
    };
    get AllProducts() {
        return this.products;
    };
     addProduct(productname, productbarcode, productprice, productquantity, productimage, productdescription, catid: any) {
        console.log("in service");
        console.log(productname);
        if (productname != "") {
            let body = {
                "name": productname,
                "barcode": productbarcode,
                "price": productprice,
                "quantity": productquantity,
                "description": productdescription,
                "image": productimage,
                "idcategory": catid,
                "status": 1
            }
            this.http.post(this.storeUrl, body).map((response: Response) => response.json())
                .subscribe(
                data => {
                    console.log(body)
                    this.products.push(data);
                   return this.products;
                },
                (err) => console.log("error")
                )
        } 
        // else
        //     console.log("error");
        // console.log(productname);
    };
    removeProduct(removeid: any) {
         this.http.delete(this.storeUrl + "/" + removeid).map((response: Response) => response.json())
                .subscribe(
                data => {
                    // console.log(data);
                   return this.getProducts();

                },
                (err) => console.log(`errror ${err}`)
                )
              
    };

    updateProduct( id,productNameEdit, productBarcodeEdit, productPriceEdit, productQuantityEdit, productImageEdit, productDescriptionEdit, status: any) {
        console.log("in service");
        console.log(productNameEdit)
        if (productNameEdit != "") {
            let body = {
                "name": productNameEdit,
                "barcode": productBarcodeEdit,
                "price": productPriceEdit,
                "quantity": productQuantityEdit,
                "description": productDescriptionEdit,
                "image": productImageEdit,
                "status": status
               

            }
            this.http.put(this.storeUrl + "/" + id, body).map((response: Response) => response.json())
                .subscribe(
                data => {
                    console.log(body);
                
               return  this.getProducts();
            },
                (err) => console.log(`errror ${err}`)
                )
        } else
            console.log("error");
    };

    updateProductQuantity( id, productQuantityUpdate: any) {
        console.log("in service");
        console.log(productQuantityUpdate)
        if (productQuantityUpdate != "") {
            let body = {
                "quantity": productQuantityUpdate
            }
            this.http.put(this.storeUrl + "/" + "edit" + "/" + "quantity" + "/" + id, body).map((response: Response) => response.json())
                .subscribe(
                data => {
                    console.log("body",body);
                    return this.getProducts();
                },
                (err) => console.log(`errror ${err}`)
                )
        } else
            console.log("error");
    };

    getproductbycategoryid(categoryid){
           return this.http.get(this.storeUrl+"/"+categoryid+"/"+categoryid).map((response: Response) => response.json())
            .subscribe(data => {
               console.log(data);
               this.products=data;
               
            },
            err => console.log(`error happened getting products ${err}`)
            );
    }
    getRemovedProduct(){
        return this.http.get(this.storeUrl+"/"+"list"+"/"+"all"+"/"+"productRemoved").map((response: Response) => response.json())
            .subscribe(data => {
                this.removedProducts = data
                console.log("adjfk",data);
            },
            err => console.log(`error happened getting products ${err}`)
            );
    };
    
}
