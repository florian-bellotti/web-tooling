// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// Services
import {ProjectService} from './providers/project.service';
import {Project} from './models/project';

@Component({
    selector: 'app-tooling-project',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

    private status: string[] = ['ACTIVE', 'INACTIVE'];
    private projectForm: FormGroup;
    private projects: Project;
    private newProject: Project;

    constructor(private fb: FormBuilder, private projectService: ProjectService) {
        this.newProject = new Project();
        this.projectForm = this.fb.group({
            'code': ['', Validators.required],
            'name': ['', Validators.required],
            'description': [''],
            'color': ['', Validators.required],
            'status': ['', Validators.required]
        });
    };

    ngOnInit(): void {
        this.getProjects();
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

    private createProject() {
        console.log(this.newProject);
        this.projectService
            .create(this.newProject)
            .subscribe(data => {
                this.newProject = new Project();
                this.getProjects();
            }, error => {
                console.log(error)
            });
    }

    private updateProject(project) {
        this.projectService
            .update(project)
            .subscribe();
    }

    private removeProject(id) {
        this.projectService
            .remove(id)
            .subscribe(data => {
                this.getProjects();
            });
    }
}
