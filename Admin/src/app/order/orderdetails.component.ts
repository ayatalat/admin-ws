import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'order-details',
    templateUrl: './orderdetails.component.html'
})
export class OrderDetails {
    productNames: any;
    id: number;
    sub;
    orderdetails: any = [];
    constructor(private orderservice: OrderService, private activatedRoute: ActivatedRoute, private loginService: LoginService, private http: Http, private router: Router) {

        // this.getorderdetails();
        // this.getproductname();
    }
    ngOnInit() {
        this.loginService.checkCredentials();
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = +params['id'];
            console.log(this.id);
            this.getorderdetails();
            this.getproductname();

        });
    }
    getorderdetails() {
        console.log("id inside methof", this.id);
        this.orderservice.getorderdetails(this.id)
            .subscribe(data => {
                this.orderdetails = data
                console.log(this.orderdetails);
            },
            (err) => console.log(`error happened getting todos ${err}`)
            );
    }

    get OrderDetails() {
        return this.orderdetails;
    }

    getproductname() {
        this.orderservice.getproductName(this.id).subscribe(data => {
            this.productNames = data
            console.log(this.productNames);
        },
            (err) => console.log(`error happened getting todos ${err}`)
        );
    }

    get ProductNames(){
        return this.productNames;  
    }
}