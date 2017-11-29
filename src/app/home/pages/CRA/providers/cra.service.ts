import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from '../../../../user/providers/header.service';
import {TokenService} from '../../../../user/providers/token.service';

@Injectable()
export class CraService {

    private static ACTIVITIES_PATH = '/activities';
    private server: string;

    constructor(private http: Http, private headerService: HeaderService, private tokenService: TokenService) {
        this.server = environment.hostServer;
    }

    getAllActivities() {
        return this.http
            .get(this.server + CraService.ACTIVITIES_PATH,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

}
