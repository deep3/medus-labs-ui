import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private _URL = Environment.apiUrl;

    constructor(private http: HttpClient) { }

    /**
     * Executes a login attempt
     * @param username The username
     * @param password The password
     */
    login(username: string, password: string) {
        return this.http.post<any>(this._URL + 'login', { username: username, password: password }, {observe: 'response'})
            .pipe(map((response: any) => {
                // login successful if there's a jwt token in the response
                if (response && response.headers.get('authorization')) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: response.headers.get('authorization')}));
                }
            }));
    }

    /**
     * Executes a Logout
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    /**
     * Sets the logged in user in the browser session
     */
    getUsername() {
        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            return currentUser.username;
        }

        return null;
    }
}
