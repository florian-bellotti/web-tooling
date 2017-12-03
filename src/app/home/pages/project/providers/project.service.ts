import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from '../../../../user/providers/header.service';

@Injectable()
export class ProjectService {

    private static PATH = '/projects';

    private server: string;

    constructor(private http: Http, private headerService: HeaderService) {
        this.server = environment.hostServer;
    }

    getAllProjects() {
        return this.http
            .get(this.server + ProjectService.PATH,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    getActiveProjects() {
        return this.http
            .get(this.server + ProjectService.PATH + '?status=ACTIVE',
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    create(project) {
        return this.http
            .post(this.server + ProjectService.PATH, project,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    update(project) {
        return this.http
            .put(this.server + ProjectService.PATH, project,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    remove(code) {
        return this.http
            .delete(this.server + ProjectService.PATH + '/' + code,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
