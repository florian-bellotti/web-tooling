import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HeaderService} from '../../user/providers/header.service';

@Injectable()
export class ActivityService {

    private static PATH = '/activities';

    private server: string;

    constructor(private http: Http, private headerService: HeaderService) {
        this.server = environment.hostServer;
    }

    getActivitiesByUserAndDate(userId, start, end) {
        return this.http
            .get(this.server + ActivityService.PATH + '?userId=' + userId + '&start=' + start + '&end=' + end,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    create(activity) {
        return this.http
            .post(this.server + ActivityService.PATH, activity,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    update(activity) {
        return this.http
            .put(this.server + ActivityService.PATH, activity,
                this.headerService.getOptionWithContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    remove(id) {
        return this.http
            .delete(this.server + ActivityService.PATH + '/' + id,
                this.headerService.getOptionWithoutContentType())
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
