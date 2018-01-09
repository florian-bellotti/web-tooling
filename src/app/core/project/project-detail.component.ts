import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

import {ProjectService} from './providers/project.service';
import {Project} from './models/project';
import {ActivityTypeService} from "./providers/activityType.service";
import {ActivityType} from "./models/activityType";
import {ActivityService} from "../cra/providers/activity.service";
import {UserService} from "../user/providers/user.service";

@Component({
    selector: 'app-tooling-detail-project',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {

    status = ['ACTIVE', 'INACTIVE'];
    newProject = false;
    updateProjectView = false;
    project: Project;
    activityTypes: ActivityType[] = [];
    newProperty = '';

    showTable = true;
    durationsPerUser = [];

    showChart = false;
    projectChartType = 'bar';
    projectChartLegend = true;
    projectChartLabels = [];
    projectChartData = [{data: [], label: 'Réalisé'}, {data: [], label: 'Estimé'}];
    projectChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0
                }
            }]
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private activityTypeService: ActivityTypeService,
        private activityServe: ActivityService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.project = new Project();
        this.project.properties = {};
        this.getActivityTypes();
        this.projectChartLabels = [];
        this.projectChartData = [{data: [], label: 'Réalisé'}, {data: [], label: 'Estimé'}];
    }

    getProject(id) {
        this.projectService
            .getProject(id)
            .subscribe(projects => {
                if (projects) {
                    this.project = projects[0];
                    if (!this.project.properties) {
                        this.project.properties = {};
                    }
                    this.getProjectDuration(this.project.code);
                }}, error => console.log(error)
            );
    }

    getProjectDuration(id) {
        this.activityServe
            .aggregateDurations({projects: [id], grpByUser: false, grpByType: true})
            .subscribe(codeDurations => {
                this.initChart(codeDurations);
            }, error => {
                console.log(error);
            });
        this.activityServe
            .aggregateDurations({projects: [id], grpByUser: true, grpByType: true})
            .subscribe(codeDurations => {
                const durationsMapPerUser = [];

                this.userService
                    .getAllUsers()
                    .subscribe(users => {
                        for (const i in codeDurations) {
                            const codeDuration = codeDurations[i];
                            if (!durationsMapPerUser[codeDuration.userId]) {
                                durationsMapPerUser[codeDuration.userId] = {};
                                for (const y in this.activityTypes) {
                                    durationsMapPerUser[codeDuration.userId][this.activityTypes[y].code] = 0
                                }
                                for (const y in users) {
                                    if (users[y].id === codeDuration.userId) {
                                        durationsMapPerUser[codeDuration.userId]['user'] = users[y].lastName + ' ' + users[y].firstName;
                                        break;
                                    }
                                }
                            }
                            durationsMapPerUser[codeDuration.userId][codeDuration.typeCode] = codeDuration.duration / 7 / 60 / 60;
                        }
                        for (const i in durationsMapPerUser) {
                            this.durationsPerUser.push(durationsMapPerUser[i]);
                        }
                        this.buildTable(codeDurations);
                    }, error => {
                        console.log(error)
                    });
            }, error => {
                console.log(error);
            });
    }

    private buildTable(codeDurations) {
        this.showTable = true;
    }

    private initChart(codeDurations) {
        this.activityTypes
            .forEach(activityType => {
                if (this.project.properties) {
                    const property = this.project.properties[activityType.code];
                    if (property) {
                        this.projectChartLabels.push(activityType.name);
                        this.projectChartData[1].data.push(property.duration);
                        for (const y in codeDurations) {
                            if (codeDurations[y].typeCode === activityType.code) {
                                this.projectChartData[0].data.push(codeDurations[y].duration / 7 / 60 / 60);
                                break;
                            }
                        }
                    }
                }
            });
        this.showChart = true;
    }

    private getActivityTypes() {
        this.activityTypeService
            .getAll()
            .subscribe(activityTypes => {
                this.activityTypes = activityTypes;
                const id = this.route.snapshot.paramMap.get('id');
                if (id === 'newProject') {
                    this.newProject = true;
                } else {
                    this.getProject(id);
                }
            }, error => {
                console.log(error)
            });
    }

    public createProject() {
        this.projectService
            .create(this.project)
            .subscribe(data => {
                this.newProject = false;
                this.router.navigate(['/project', data.id]);
            }, error => {
                console.log(error)
            });
    }

    public updateProject() {
        this.projectService
            .update(this.project)
            .subscribe(data => {
                this.projectChartLabels = [];
                this.projectChartData = [{data: [], label: 'Estimé'}];
                this.updateProjectView = false;
                this.getActivityTypes();
            }, error => this.updateProjectView = false);
    }

    public removeProject() {
        this.projectService
            .remove(this.project.id)
            .subscribe(data => {
                this.router.navigate(['/projects'])
            });
    }

    changeProjectView(view) {
        if (view === 'update') {
            this.showChart = false;
            this.updateProjectView = true;
        } else {
            this.updateProjectView = false;
            this.showChart = true;
        }
    }

    addProperty() {
        if (this.newProperty && this.newProperty !== '') {
            this.project.properties[this.newProperty] = {};
            const activityTypes = this.activityTypes;
            this.activityTypes = [];
            this.activityTypes = activityTypes;
            this.newProperty = '';
        }
    }

    removeProperty(property) {
        this.project.properties[property] = undefined;
        const activityTypes = this.activityTypes;
        this.activityTypes = [];
        this.activityTypes = activityTypes;
        this.newProperty = '';
    }
}
