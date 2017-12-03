export class Project {

    code: string;
    name: string;
    status: string;
    color: string;
    description: string;

    public toString() {
        return 'User {' +
            'code: ' + this.code +
            ', name: ' + this.name +
            ', color: ' + this.color +
            ', description: ' + this.description +
            ', status: ' + this.status + '}'
    }
}
