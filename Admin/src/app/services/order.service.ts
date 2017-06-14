
import { Injectable } from "@angular/core";
import { Http, Response, Request } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/map';
@Injectable()
export class OrderService {
    public orders: any = [];
   
    orderUrl = "https://storewebservice.herokuapp.com/orders";
    constructor(private http: Http, private activatedRoute: ActivatedRoute) {
       this.getAllOrders();

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

   
}