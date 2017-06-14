
import { Injectable } from "@angular/core";
import { Http, Response, Request } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {
    public users: any = [];
   
    userUrl = "http://localhost:3000/users";
    constructor(private http: Http) {
        this.getallusers();
    }

    getallusers() {
        return this.http.get(this.userUrl).map((response: Response) => response.json())
            .subscribe(data => {
                this.users = data
            },
            (err) => console.log(`error happened getting todos ${err}`)
            );
    }
    get Users() {
        return this.users;
    }




}