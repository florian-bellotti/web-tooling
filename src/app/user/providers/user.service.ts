import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from './header.service';

@Injectable()
export class UserService {

    private static PATH = '/users';

    private server: string;

    constructor(private http: Http, private headerService: HeaderService) {
        this.server = environment.hostServer;
    }

    getAllUsers() {
        return this.http
            .get(this.server + UserService.PATH,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    findCurrentUser(email: string) {
        return this.http
            .get(this.server + UserService.PATH + '?email=' + email,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    create(user: User) {
        return this.http
            .post(this.server + UserService.PATH, user,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    update(user: User) {
        return this.http
            .put(this.server + UserService.PATH,
                JSON.stringify(user),
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    remove(id) {
        return this.http
            .delete(this.server + UserService.PATH + '/' + id,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
