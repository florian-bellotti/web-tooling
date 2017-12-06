import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { UserLogin } from '../models/userLogin';
import {TokenService} from '../../user/providers/token.service';

@Injectable()
export class AuthService {

    private static USERS_PATH = '/users';
    private static AUTHENTICATE_PATH = AuthService.USERS_PATH + '/authenticate';
    private static EXPIRATION_DATE = 24 * 60 * 60 * 1000;

    private server: string;
    private headers: Headers;
    private options: RequestOptions;
    private authenticatePath: string;

    constructor(private http: Http, private tokenService: TokenService) {
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
        const expirationDate = this.tokenService.decodeToken();
        if (expirationDate == null) {
            console.error('Non connecté !');
            return Observable.of(false);
        } else {
            const now = new Date().getTime();
            if (expirationDate <= now) {
                this.tokenService.removeToken();
                console.error('Token expiré !');
                return Observable.of(false);
            }
            if ((now + AuthService.EXPIRATION_DATE) > expirationDate) {
                console.error('Refresh Token !');
                this.tokenService.refresh().subscribe();
            }
            return Observable.of(true);
        }
    }

}
