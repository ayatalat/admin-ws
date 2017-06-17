import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class AuthComponent {
    public email: string;
    public password: string;
    public errorMessage: string;
    result: any;
    constructor(private router: Router,
        private login: LoginService) {
        
    }

    adminCheck() {
        this.login.login(this.email, this.password).subscribe(data => {
            if (data) {
                console.log(data);
                  localStorage.setItem("user", this.email);
                  console.log(localStorage.setItem("user",this.email));
                  this.router.navigate(['/home']);   
            } else {
                console.log("error");
            }
        },
            err => console.log(`error happened getting users ${err}`)
        )
    }

    authenticate(form) {
        if (form.valid) {

        }
    }
}
