import {KJUR, b64utoutf8} from 'jsrsasign';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class TokenService {

    private static TOKEN_NAME = 'tokenTooling';

    public user: User;

    constructor() {
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
}
