import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from './providers/auth.service';
import { UserLogin } from './models/userLogin';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public errorMessage: string;

    constructor(router: Router, fb: FormBuilder, private authService: AuthService) {
        this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values): void {
        if (this.form.valid) {
            // TODO : change tenandId (123456)
            this.errorMessage = '';
            const user = new UserLogin(values.email, values.password, '123456');
            this.authService
                .signin(user)
                .subscribe(data => {
                    localStorage.setItem('tokenTooling', data.token);
                    this.router.navigate(['/'])
                }, error => {
                    if (error.error === 'INVALID_CREDENTIALS') {
                        this.errorMessage = 'L \' email ou le mot de passe sont incorrects';
                    } else {
                        this.errorMessage = error.message
                    }
                });
        }
    }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
