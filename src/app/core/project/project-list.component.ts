// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, Router} from '@angular/router';

// Services
import {ProjectService} from './providers/project.service';
import {Project} from './models/project';
import {ActivityType} from './models/activityType';
import {ActivityTypeService} from './providers/activityType.service';

@Component({
    selector: 'app-tooling-list-project',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

    public projects: Array<Project> = [];
    public activityTypes: Array<ActivityType> = [];
    public newActivityType: ActivityType;

    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private activityTypeService: ActivityTypeService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.newActivityType = new ActivityType();
        this.getProjects();
        this.getActivityTypes();
    }

    private getProjects() {
        this.projectService
            .getAllProjects()
            .subscribe(projects => {
                this.projects = projects;
            }, error => {
                console.log(error)
            });
    }

    newProject() {
        this.router.navigate(['/project/newProject'])
    }

    private getActivityTypes() {
        this.activityTypeService
            .getAll()
            .subscribe(activityTypes => {
                this.activityTypes = activityTypes;
            }, error => {
                console.log(error)
            });
    }

    public createActivityType() {
        this.activityTypeService
            .create(this.newActivityType)
            .subscribe(data => {
                this.newActivityType = new ActivityType();
                this.getActivityTypes();
            }, error => {
                console.log(error)
            });
    }

    public updateActivityTypes(activityType) {
        this.activityTypeService
            .update(activityType)
            .subscribe();
    }

    public removeActivityTypes(id) {
        this.activityTypeService
            .remove(id)
            .subscribe(data => {
                this.getActivityTypes();
            });
    }
}
