import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {TokenService} from './providers/token.service'
import {UserService} from './providers/user.service'
import {HeaderService} from './providers/header.service'
import {User} from './models/user';

@Component({
    selector: 'app-user',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [TokenService, UserService, HeaderService]
})
export class UserComponent {

    private static ADMIN_RULES: Array<string> = ['USER_ADMIN', 'ADMIN'];

    private userForm: FormGroup;
    private user: User;
    private email: string;
    private errorMessage: string;
    private formChange: boolean;
    private showUserForm: boolean;

    constructor(private fb: FormBuilder, private tokenService: TokenService, private userService: UserService) {
        this.email = this.tokenService.user.email;
        this.user = new User();
        this.formChange = false;
        this.showUserForm = false;
        this.findCurrentUser();
    };

    private initForm() {
        this.userForm = this.fb.group({
            'email' : ['', Validators.required],
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'address': [''],
            'phone': ['']
        });
    }

    private onFormChange() {
        this.formChange = true;
    }

    private changeShowForm() {
        if (this.showUserForm) {
            this.formChange = false;
            this.showUserForm = false;
        } else {
            this.initForm();
            this.showUserForm = true;
        }
    }

    private findCurrentUser() {
        this.userService
            .findCurrentUser(this.email)
            .subscribe(data => {
                this.user = data[0];
                this.formChange = false;
                console.log(this.user);
                console.log(this.user.groups);

                /*for (const rule in UserComponent.ADMIN_RULES) {
                    if (UserComponent.ADMIN_RULES.hasOwnProperty(rule)) {
                        console.log(this.user.groups.indexOf(rule));
                        if (this.user.groups.indexOf(rule) > -1) {
                            console.log('YES')
                            //do stuff with array
                        }
                    }
                }*/


            }, error => {
                console.log(error)
            });
    }

    private updateUser(): void {
        this.errorMessage = '';

        if (this.userForm.valid) {
            this.userService
                .update(this.user)
                .subscribe(data => {
                    this.findCurrentUser();
                    this.changeShowForm();
                    this.tokenService.refresh().subscribe();
                    // TODO: Add sucessMessage in toast => 'Modifications enregistrées avec succés.'
                }, error => {
                    console.log(error)
                });
        } else {
            this.errorMessage = 'Le formulaire n\'est pas valide.';
        }
    }
}

