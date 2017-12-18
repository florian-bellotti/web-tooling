// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivityService} from '../cra/providers/activity.service';
import {ProjectService} from '../project/providers/project.service';
import {ActivityTypeService} from '../project/providers/activityType.service';

@Component({
    selector: 'app-tooling-home',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private activityService: ActivityService,
                private projectService: ProjectService,
                private activityTypeService: ActivityTypeService) {}

    ngOnInit() {

    }
}
