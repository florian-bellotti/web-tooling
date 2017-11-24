import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from '../models/user';

@Injectable()
export class AuthService {

    server = 'http://10.162.128.58:8080';
    constructor(private _http: Http) {}

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });
        return this._http.post(this.server + '/users/authenticate', body, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))

    }

    isLoggedIn() {
        if (localStorage.getItem('tokenTooling')) {
            return Observable.of(true);
        } else {
            console.error('Non connecté !');
            return Observable.of(false);
        }
        // const token = localStorage.getItem('token')
        //     ? '?token=' + localStorage.getItem('token')
        //     : '';
        // return this._http.get('http://localhost:3000/userRoutes/checkLogin'+token)
        //     .map((response: Response) => response.json())
        //     .catch(error => {
        //         const errorMessage = `Une erreur ${error.status} est survenue en tentant de joindre ${error.url}`;
        //         return Observable.throw(errorMessage);
        //     });
    }

}
