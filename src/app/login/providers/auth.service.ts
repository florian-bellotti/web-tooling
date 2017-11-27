import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { UserLogin } from '../models/userLogin';

@Injectable()
export class AuthService {

    private static USERS_PATH = '/users';
    private static AUTHENTICATE_PATH = AuthService.USERS_PATH + '/authenticate';

    private server: string;
    private headers: Headers;
    private options: RequestOptions;
    private authenticatePath: string;

    constructor(private http: Http) {
        this.server = environment.hostServer;
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
        this.authenticatePath = this.server + AuthService.AUTHENTICATE_PATH;
    }

    signin(user: UserLogin) {
        return this.http
            .post(this.authenticatePath, JSON.stringify(user), this.options)
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
