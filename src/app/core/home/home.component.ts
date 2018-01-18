// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivityService} from '../cra/providers/activity.service';
import {ProjectService} from '../project/providers/project.service';
import {ActivityTypeService} from '../project/providers/activityType.service';
import {AppConfig} from '../../app.config';
import {TokenService} from '../user/providers/token.service';
import {ActivityType} from '../project/models/activityType';

@Component({
    selector: 'app-tooling-home',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private activities;
    projects = [];
    activityTypes: ActivityType[] = [];

    public options = {animation : false};

    public activityByMonth = false;
    public activityByMonthType = 'doughnut';
    public activityByMonthLabels: string[];
    public activityByMonthData: number[];
    public activityByMonthColor;

    public typeActivityByMonth = false;
    public typeActivityByMonthType = 'doughnut';
    public typeActivityByMonthLabels: string[];
    public typeActivityByMonthData: number[];

    public projectChartType = 'bar';
    public projectChartLegend = true;
    public projectChartLabels = [];
    public projectChartOptions = {
        responsive: true,
        animation : false,
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0
                }
            }]
        }
    };

    public projectChartData = [];
    showCharts = false;

    constructor(private activityService: ActivityService,
                private projectService: ProjectService,
                private activityTypeService: ActivityTypeService,
                private tokenService: TokenService,
                private appConfig: AppConfig) {}

    ngOnInit() {
        this.activityByMonthLabels = [];
        this.activityByMonthData = [];
        this.getActivityTypes();
    }

    private getActivityTypes() {
        this.activityTypeService
            .getAll()
            .subscribe(activityTypes => {
                this.activityTypes = activityTypes;
                this.projectService
                    .getAllProjects()
                    .subscribe(projects => {
                        this.projects = projects;
                        this.getActivityByMonth();
                        this.getTypeActivityByMonth()
                    });
            }, error => {
                console.log(error)
            });
    }

    public getActivityByMonth() {
        this.activityService
            .aggregateDurations({userIds: [this.tokenService.user.id], grpByUser: true})
            .subscribe(activities => {
                this.activities = activities;
                const labels: string[] = [];
                const projectsId = [];
                const data: number[] = [];
                const backgroundColor = [];
                if (activities) {
                    for (const i in activities) {
                        labels.push(activities[i].code);
                        data.push(activities[i].duration / 7 / 60 / 60);
                        const rgba = this.appConfig.rgba(this.getColorFromProjectCode(activities[i].code), 0.5);
                        backgroundColor.push(rgba)
                    }
                    this.activityByMonthLabels = labels;
                    this.activityByMonthData = data;
                    this.activityByMonthColor = [{backgroundColor: backgroundColor}];
                    this.activityByMonth = true;
                }
                this.getProjectDurations(labels);
            }, error => {
                console.log(error);
            })
    }

    private getProjectDurations(projectsCode) {
        this.activityService
            .aggregateDurations({projects: projectsCode, grpByUser: false, grpByType: true})
            .subscribe(codeDurations => {
                this.initCharts(codeDurations);
            }, error => {
                console.log(error);
            });
    }

    private initCharts(codeDurations) {
        console.log(codeDurations);
        this.activityTypes
            .forEach(activityType => {
                for (const i in this.projects) {
                    const property = this.projects[i].properties[activityType.code];
                    if (property) {
                        if (!this.projectChartLabels[this.projects[i].code]) {
                            this.projectChartLabels[this.projects[i].code] = []
                        }
                        if (!this.projectChartData[this.projects[i].code]) {
                            this.projectChartData[this.projects[i].code] = [
                                {data: [], label: 'Réalisé'},
                                {data: [], label: 'Estimé'}];
                        }
                        this.projectChartLabels[this.projects[i].code].push(activityType.name);
                        this.projectChartData[this.projects[i].code][1].data.push(property.duration);
                        for (const y in codeDurations) {
                            if (codeDurations[y].typeCode === activityType.code && codeDurations[y].code === this.projects[i].code) {
                                this.projectChartData[this.projects[i].code][0].data.push(codeDurations[y].duration / 7 / 60 / 60);
                                break;
                            }
                        }
                    }
                }
                this.showCharts = true;
            });
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
                this.activities = activities;
                const labels: string[] = [];
                const data: number[] = [];
                const backgroundColor = [];
                if (activities) {
                    for (const i in activities) {
                        labels.push(activities[i].typeCode);
                        data.push(activities[i].duration / 7 / 60 / 60);
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
