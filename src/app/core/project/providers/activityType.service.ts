import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from '../../user/providers/header.service';

@Injectable()
export class ActivityTypeService {

    private static PATH = '/activities/types';

    private server: string;

    constructor(private http: Http, private headerService: HeaderService) {
        this.server = environment.hostServer;
    }

    getAll() {
        return this.http
            .get(this.server + ActivityTypeService.PATH,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    create(activityType) {
        return this.http
            .post(this.server + ActivityTypeService.PATH, activityType,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    update(activityType) {
        return this.http
            .put(this.server + ActivityTypeService.PATH, activityType,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    remove(id) {
        return this.http
            .delete(this.server + ActivityTypeService.PATH + '/' + id,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
