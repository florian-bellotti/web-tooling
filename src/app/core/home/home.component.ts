// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivityService} from '../cra/providers/activity.service';
import {ProjectService} from '../project/providers/project.service';
import {ActivityTypeService} from '../project/providers/activityType.service';
import {AppConfig} from '../../app.config';
import {TokenService} from '../user/providers/token.service';

@Component({
    selector: 'app-tooling-home',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private activities;
    private projects;

    public option = {animation : false};

    public activityByMonth = false;
    public activityByMonthType = 'doughnut';
    public activityByMonthLabels: string[];
    public activityByMonthData: number[];
    public activityByMonthColor;

    public typeActivityByMonth = false;
    public typeActivityByMonthType = 'doughnut';
    public typeActivityByMonthLabels: string[];
    public typeActivityByMonthData: number[];

    constructor(private activityService: ActivityService,
                private projectService: ProjectService,
                private activityTypeService: ActivityTypeService,
                private tokenService: TokenService,
                private appConfig: AppConfig) {}

    ngOnInit() {
        this.activityByMonthLabels = [];
        this.activityByMonthData = [];
        this.projectService
            .getAllProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.getActivityByMonth();
                this.getTypeActivityByMonth()
            });
    }

    public getActivityByMonth() {
        this.activityService
            .aggregateDurations({userIds: [this.tokenService.user.id], grpByUser: true})
            .subscribe(activities => {
                this.activities = activities;
                const labels: string[] = [];
                const data: number[] = [];
                const backgroundColor = [];
                if (activities) {
                    for (const i in activities) {
                        labels.push(activities[i].code);
                        data.push(activities[i].duration / 60 / 60);
                        const rgba = this.appConfig.rgba(this.getColorFromProjectCode(activities[i].code), 0.5);
                        backgroundColor.push(rgba)
                    }
                    this.activityByMonthLabels = labels;
                    this.activityByMonthData = data;
                    this.activityByMonthColor = [{backgroundColor: backgroundColor}];
                    this.activityByMonth = true;
                }
            }, error => {
                console.log(error);
            })
    }

    public getTypeActivityByMonth() {
        this.activityService
            .aggregateDurations({
                userIds: [this.tokenService.user.id],
                grpByCode: false,
                grpByUser: true,
                grpByType: true
            })
            .subscribe(activities => {
                console.log(activities);
                this.activities = activities;
                const labels: string[] = [];
                const data: number[] = [];
                const backgroundColor = [];
                if (activities) {
                    for (const i in activities) {
                        labels.push(activities[i].typeCode);
                        data.push(activities[i].duration / 60 / 60);
                    }
                    this.typeActivityByMonthLabels = labels;
                    this.typeActivityByMonthData = data;
                    this.typeActivityByMonth = true;
                }
            }, error => {
                console.log(error);
            })
    }

    private getColorFromProjectCode(code) {
        const index = this.projects.map(project => project.code).indexOf(code);
        let color;
        if (index === -1) {
            color = '';
        } else {
            color = (this.projects[index].color === undefined) ? '' : this.projects[index].color;
        }
        return color;
    }
}
