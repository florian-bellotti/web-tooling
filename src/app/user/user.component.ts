import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {TokenService} from './providers/token.service'
import {User} from "./models/user";

@Component({
    selector: 'app-user',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [TokenService]
})
export class UserComponent {

    private tokenService: TokenService;
    private router: Router;
    private user: User;

    constructor(router: Router, tokenService: TokenService) {
        this.router = router;
        this.tokenService = tokenService;
        this.user = tokenService.user;
    };
}

