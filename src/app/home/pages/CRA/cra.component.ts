// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// Services
import {ActivityService} from './providers/activity.service';
import {AppConfig} from '../../../app.config';
import {ProjectService} from '../project/providers/project.service';
import {Project} from '../project/models/project';
import {TokenService} from '../../../user/providers/token.service';
import * as moment from 'moment';
import {fr} from 'moment/locale/fr'


@Component({
  selector: 'app-tooling-cra',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cra.component.html'
})
export class CraComponent implements OnInit {
    public config: any;
    public configFn: any;

    calendarOptions: any;
    $calendar: any;
    dragOptions: Object = { zIndex: 999, revert: true, revertDuration: 0 };
    event: any = {};
    createEvent: any;
    removeEvent: any;
    updateEvent: any;
    eventForm: FormGroup;
    timezoneOffset: number;

    projects: Array<Project> = [];

    constructor(private fb: FormBuilder, private appConfig: AppConfig, private activityService: ActivityService,
                private projectService: ProjectService, private tokenService: TokenService) {
        this.config = this.appConfig.config;
        this.configFn = this.appConfig;
        this.calendarOptions = this.initCalendarOptions();
        this.timezoneOffset = new Date().getTimezoneOffset();
        this.eventForm = this.fb.group({
            'project' : ['', Validators.required],
            'description': ['']
        });

    };

    renderEvent(event): void {
        this.$calendar.fullCalendar('renderEvent', event, true);
    };

    ngOnInit(): void {
        this.$calendar = jQuery('#calendar');
        this.$calendar.fullCalendar(this.calendarOptions);
        this.getProjects();

        jQuery('#projects-draggable').bind('DOMNodeInserted', function() {
            jQuery('.draggable').draggable({ zIndex: 999, revert: true, revertDuration: 0 });
        });
    }

    private getProjects() {
        this.projectService
            .getAllProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.getActivities();
            }, error => {
               console.log(error)
            });
    }

    private getActivities() {
        this.activityService
            .getActivitiesByUser(this.tokenService.user.id)
            .subscribe(activities => {
                activities
                    .map(activity => {
                        this.renderEvent(this.mapActivityToEvent(activity));
                    })
            }, error => {
                console.log(error)
            });
    }

    private createActivities(newEvent) {
        this.activityService
            .create(this.mapEventToActivity(newEvent))
            .subscribe(activity => {
                this.renderEvent(this.mapActivityToEvent(activity));
            }, error => {
                console.log(error);
            });
    }

    private mapEventToActivity(event) {
        const start = moment(event.start).add(this.timezoneOffset, 'm').unix();
        const end = moment(event.end).add(this.timezoneOffset, 'm').unix();
        return {
            id: event.id,
            userId: this.tokenService.user.id,
            code: event.code,
            startDate: start,
            endDate: end,
            description: event.description
        };
    }

    private mapActivityToEvent(activity) {
        const index = this.projects.map(project => project.code).indexOf(activity.code);
        let color;
        if (index === -1) {
            color = this.config.colors.success;
        } else {
            color = (this.projects[index].color === undefined) ? this.config.colors.success : this.projects[index].color;
        }

        return {
            id: activity.id,
            code: activity.code,
            title: activity.code,
            start: new Date(activity.startDate * 1000),
            end: new Date(activity.endDate * 1000),
            backgroundColor: color,
            textColor: this.config.colors.default,
            description: activity.description
        }
    }

    private initCalendarOptions() {
        return {
            lang: 'fr',
            header: {
                left: '',
                center: 'title',
                right: 'prev,next today'
            },
            events: [],
            allDaySlot: false,
            defaultView: 'agendaWeek',
            eventColor: this.config.colors.info,
            selectable: true,
            selectHelper: true,
            editable: true,
            droppable: true,
            select: (start, end): void => {
                this.createEvent = () => {
                    const title = this.event.title;
                    if (title) {
                        const newEvent = {
                            code: title,
                            title: title,
                            start: start,
                            end: end,
                            backgroundColor: this.config.colors.success,
                            textColor: this.config.colors.default
                        };
                        this.createActivities(newEvent);
                    }
                    this.$calendar.fullCalendar('unselect');
                    jQuery('#create-event-modal').modal('hide');
                };

                jQuery('#create-event-modal').modal('show');
            },
            eventDrop: (event): void => {
                this.activityService.update(this.mapEventToActivity(event)).subscribe();
            },
            eventResize: (event): void => {
                this.activityService.update(this.mapEventToActivity(event)).subscribe();
            },
            eventClick: (event): void => {
                this.event = event;
                this.removeEvent = () => {
                    this.activityService.remove(this.event.id).subscribe();
                    this.$calendar.fullCalendar('removeEvents', this.event._id);
                };
                this.updateEvent = () => {
                    this.activityService.update(this.mapEventToActivity(this.event)).subscribe();
                    this.renderEvent(this.event);
                };
                jQuery('#show-event-modal').modal('show');
            },
            drop: (dateItem, event): void => {
                const newEvent = {
                    code: jQuery.trim(jQuery(event.target)[0].id),
                    title: jQuery.trim(jQuery(event.target)[0].id),
                    start: moment(dateItem),
                    end: moment(dateItem).add(2, 'hours'),
                    backgroundColor: this.config.colors.success,
                    textColor: this.config.colors.default
                };
                this.createActivities(newEvent);
            },
            dayRender: function (date, cell) {
                const today = new Date().toDateString();
                const compareDate = date.toDate().toDateString();
                if (today === compareDate) {
                    cell.css('background-color', '#ccc');
                }
            }
        };
    }
}