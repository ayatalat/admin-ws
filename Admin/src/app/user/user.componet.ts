import { Component, OnInit  } from '@angular/core';
import { UserService } from '../services/user.service';
import { Http, Response, Request } from '@angular/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent {
    username;
    selecteduser;
    constructor(private userservice:UserService,private loginService: LoginService, private http: Http, private router: Router) {
    }
    ngOnInit(){
        this.loginService.checkCredentials();
    }
    getusers(){
      return   this.userservice.Users;
    }

}
