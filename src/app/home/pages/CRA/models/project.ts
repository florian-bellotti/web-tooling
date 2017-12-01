export class Project {

    code: string;
    name: string;
    status: string;

    public toString() {
        return 'User {' +
            'code: ' + this.code +
            ', name: ' + this.name +
            ', status: ' + this.status + '}'
    }
}
