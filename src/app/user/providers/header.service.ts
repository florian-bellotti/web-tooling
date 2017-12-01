import {KJUR, b64utoutf8} from 'jsrsasign';
import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {TokenService} from './token.service';

@Injectable()
export class HeaderService {

    constructor(private tokenService: TokenService) {}

    private getHeaderWitContentType(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.tokenService.getToken()
        });
    }

    private getHeaderWitoutContentType(): Headers {
        return new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getToken()
        });
    }

    public getOptionWithContentType(): RequestOptions {
        return new RequestOptions({ headers: this.getHeaderWitContentType() });
    }

    public getOptionWithoutContentType(): RequestOptions {
        return new RequestOptions({ headers: this.getHeaderWitoutContentType() });
    }
}
