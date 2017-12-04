// Vendors
import 'style-loader!fullcalendar/dist/fullcalendar.min.css';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

// Services
import {UserService} from '../user/providers/user.service';
import {User} from '../user/models/user';

@Component({
    selector: 'app-tooling-users',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    groups: string[] = ['ADMIN', 'USER'];
    users: User;
    newUser: User;

    constructor(private userService: UserService) {
        this.newUser = new User();
    };

    ngOnInit(): void {
        this.getUsers();
    }

    private getUsers() {
        this.userService
            .getAllUsers()
            .subscribe(users => {
                this.users = users;
            }, error => {
                console.log(error)
            });
    }

    private createUser() {
        this.userService
            .create(this.newUser)
            .subscribe(data => {
                this.newUser = new User();
                this.getUsers();
            }, error => {
                console.log(error)
            });
    }

    private updateUser(project) {
        this.userService
            .update(project)
            .subscribe();
    }

    private removeUser(id) {
        this.userService
            .remove(id)
            .subscribe(data => {
                this.getUsers();
            });
    }
}
