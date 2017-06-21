import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

     constructor(private orderser: OrderService, private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit(){
        this.loginService.checkCredentials();
    }
    listOrders() {
        return this.orderser.orders;
    }
    changestatus(event, idorder, status) {
        this.orderser.changestatus(idorder, status).subscribe(data => {
            if (status == 4) {
                event.target.setAttribute("class", "btn-warning");
                event.target.setAttribute("value", "on the way");

            } else {
                event.target.setAttribute("class", "btn-success");
                event.target.setAttribute("value", "deliveried");

            }

            console.log("success");
        },
            (err) => console.log(`error happened ${err}`)
        );
    }

    deliveried(event, idorder,status) {

       if(this.orderser.updatedeliverytime(idorder)){
         console.log("success added delivery time");
            event.target.setAttribute("class", "btn-success");
            event.target.setAttribute("value", "done");
       }else{
           console.log("failed in add time");
       }
           
    }

}
