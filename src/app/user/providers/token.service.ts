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

    public decodeToken() {
        const token = localStorage.getItem(TokenService.TOKEN_NAME);
        const decodedToken = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split('.')[1]));
        this.user = new User(decodedToken.mail, decodedToken.fnm, decodedToken.lnm, decodedToken.grp, decodedToken.loc);
    }
}
