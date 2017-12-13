// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// Services
import {ProjectService} from './providers/project.service';
import {Project} from './models/project';
import {ActivityType} from "./models/activityType";
import {ActivityTypeService} from "./providers/activityType.service";

@Component({
    selector: 'app-tooling-project',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

    private status: string[] = ['ACTIVE', 'INACTIVE'];
    public projects: Array<Project>  = [];
    private newProject: Project;
    public activityTypes: Array<ActivityType> = [];
    public newActivityType: ActivityType;

    constructor(private fb: FormBuilder,
                private projectService: ProjectService,
                private activityTypeService: ActivityTypeService) {}

    ngOnInit(): void {
        this.newProject = new Project();
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

    public createProject() {
        this.projectService
            .create(this.newProject)
            .subscribe(data => {
                this.newProject = new Project();
                this.getProjects();
            }, error => {
                console.log(error)
            });
    }

    public updateProject(project) {
        this.projectService
            .update(project)
            .subscribe();
    }

    public removeProject(id) {
        this.projectService
            .remove(id)
            .subscribe(data => {
                this.getProjects();
            });
    }

    private getActivityTypes() {
        this.activityTypeService
            .getAll()
            .subscribe(activityTypes => {
                console.log(activityTypes);
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
