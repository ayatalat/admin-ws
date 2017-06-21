import { Component, OnInit } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { OrderService } from "app/services/order.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private orderservice:OrderService,private loginService: LoginService, private http: Http, private router: Router) {
   
 }
    ngOnInit() {
        this.loginService.checkCredentials();
    }
 
 gethomeorder(){
     console.log(this.orderservice.homeorders);
   return  this.orderservice.homeorders;
 }
  changestatus(event, idorder, status) {
        this.orderservice.changestatus(idorder, status).subscribe(data => {
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

}
