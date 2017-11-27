export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    groups: Array<string>;
    address: string;
    phone: string;
    active: boolean;
    locale: string;

    constructor(email: string, firstName: string, lastName: string, groups: Array<string>, locale: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.groups = groups;
        this.locale = locale;
    }

    public toString() {
        return 'User {' +
            'id: ' + this.id +
            ', email: ' + this.email +
            ', firstName: ' + this.firstName +
            ', lastName: ' + this.lastName +
            ', groups: ' + this.groups +
            ', address: ' + this.address +
            ', phone: ' + this.phone +
            ', active: ' + this.active +
            ', locale: ' + this.locale + '}'
    }
}
