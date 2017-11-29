import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from './header.service';

@Injectable()
export class UserService {

    private static USERS_PATH = '/users';

    private server: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http, private headerService: HeaderService) {
        this.server = environment.hostServer;
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
        this.server = environment.hostServer;
    }

    findCurrentUser(email: string) {
        return this.http
            .get(this.server + UserService.USERS_PATH + '?email=' + email,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    update(user: User) {
        return this.http
            .put(this.server + UserService.USERS_PATH,
                JSON.stringify(user),
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
