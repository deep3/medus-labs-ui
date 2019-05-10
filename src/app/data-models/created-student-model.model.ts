
export class CreatedStudentModel {
    username: string;
    password: string;
    loginUrl: string;

    constructor(username: string, password: string, loginUrl: string) {
        this.username = username;
        this.password = password;
        this.loginUrl = loginUrl;
    }
}
