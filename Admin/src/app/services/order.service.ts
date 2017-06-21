
import { Injectable } from "@angular/core";
import { Http, Response, Request } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/map';
@Injectable()
export class OrderService {
    public orders: any = [];
    orderdetails: any = [];
        homeorders:any=[];

    orderUrl = "https://storewebservice.herokuapp.com/orders";
    constructor(private http: Http, private activatedRoute: ActivatedRoute) {
        this.getAllOrders();
        this.gethomeorders();

    }

    getAllOrders() {
        this.http.get(this.orderUrl).map((response: Response) => response.json())
            .subscribe(data => {
                this.orders = data
            },
            (err) => console.log(`error happened getting todos ${err}`)
            );
    }
    get Orders() {
        return this.orders;
    }

    changestatus(idorder, status) {
        let updatedorder = {
            "idorder": idorder,
            "status": status
        }
        return this.http.put(this.orderUrl + "/" + idorder, updatedorder).map((response: Response) => response.json())

    }

    getorderdetails(orderid) {
        return this.http.get(this.orderUrl + "/" + "details" + "/" + orderid).map((response: Response) => response.json())
    }

    
    updatedeliverytime(idorder){
        return this.http.put(this.orderUrl,idorder).map((response: Response) => response.json()).subscribe(data => {
               console.log("success in add time ")
            },
            (err) => console.log(`error happened add time ${err}`)
            );

    }

    gethomeorders(){
        return this.http.get(this.orderUrl+"/"+"home"+"/"+"order"+"/"+"all").map((response:Response)=> response.json())
        .subscribe(data => {
              console.log(data);
                this.homeorders=data;
                console.log(this.homeorders);
            },
            (err) => console.log(`error happened getting todos ${err}`)
            );
    }

    get homeOrders(){
        return this.homeorders
    }
    
}