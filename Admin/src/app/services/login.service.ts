import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response, Request } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import "rxjs/add/operator/map";
@Injectable()
export class LoginService {

    public users: any = [];
    public adminUser: any;
    public adminEmail="admin@gmail.com";

    loginUrl = "https://storewebservice.herokuapp.com/users";
    constructor(private http: Http, private router: Router) {

    }

    getAdmin() {

        this.http.get(`${this.loginUrl}/${this.adminEmail}`).map((response: Response) => response.json())
            .subscribe(data => {
               this.adminUser= data;
               console.log("adminuser",this.adminUser);
            
             console.log(`the data is ${this.adminUser[0].email}`);
            },
            err => console.log(`error happened getting users ${err}`)
            );
    };
    
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }
 
  login(email,password){
      console.log("email from form ",email);
      console.log("email from database ",this.adminUser[0].email);
    if (this.adminUser[0].email == email && this.adminUser[0].password == password){
      localStorage.setItem("user", this.adminUser);
     // console.log(localStorage.setItem("user",this.adminUser));
      this.router.navigate(['/home']);   
      return true;
    }
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this.router.navigate(['/login']);
    }
  } 
}