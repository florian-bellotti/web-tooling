export class User {

    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    groups: Array<string>;
    address?: string;
    phone?: string;
    active?: boolean;
    locale: string;

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
