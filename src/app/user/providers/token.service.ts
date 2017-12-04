import {b64utoutf8, KJUR} from 'jsrsasign';
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable} from 'rxjs/Rx';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenService {

    private static PATH = '/users/refresh';
    private static TOKEN_NAME = 'tokenTooling';

    private server: string;
    public user: User;

    constructor(private http: Http) {
        this.server = environment.hostServer;
        this.decodeToken();
    }

    public getToken(): string {
        return localStorage.getItem(TokenService.TOKEN_NAME);
    }

    public decodeToken() {
        const token = this.getToken();
        const decodedToken = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split('.')[1]));
        this.user = {
            id: decodedToken.usr,
            email: decodedToken.mail,
            firstName: decodedToken.fnm,
            lastName: decodedToken.lnm,
            groups: decodedToken.grp,
            locale: decodedToken.loc
        };
    }

    public refresh() {
        const headers = new Headers({
            'Authorization': 'Bearer ' + this.getToken()
        });
        const options = new RequestOptions({ headers: headers });
        return this.http
            .get(this.server + TokenService.PATH, options)
            .map((response: Response) =>  {
                localStorage.setItem('tokenTooling', response.json().token);
                this.decodeToken();
            })
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
