import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'show-order',
    templateUrl: './showorder.component.html'
})
export class showsingleorderComponent {
    id: number;
    userorder: any = [];
    constructor(private orderservice: OrderService, private activatedRoute: ActivatedRoute, private loginService: LoginService, private http: Http, private router: Router) {
        this.getorderbyuserid();
    }
    ngOnInit() {
        this.loginService.checkCredentials();
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['id'];
            console.log(this.id);


        });
    }
    getorderbyuserid() {
        return this.orderservice.orders.filter((order) => order.iduser == this.id)
    }


    changestatus(event, idorder, status) {
        this.orderservice.changestatus(idorder, status).subscribe(data => {
            if (status == 4) {
                event.target.setAttribute("class", "btn-warning");
                event.target.setAttribute("value", "on the way");

            }else{
                event.target.setAttribute("class", "btn-success");
            event.target.setAttribute("value", "deliveried");

            }

            console.log("success");
        },
            (err) => console.log(`error happened getting todos ${err}`)
        );
    }

    deliveried(event,idorder){
        
    }
}