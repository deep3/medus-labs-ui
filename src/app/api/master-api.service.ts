import { Environment } from 'environments/environment';
import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';


@Injectable()
export class MasterApiService {

    protected http: HttpClient;

    protected _postsURL = Environment.apiUrl;

    constructor(http: HttpClient) {
        this.http = http;
    }

    /**
     * Gets the base URL for the API
     */
    getUrl() {
        return this._postsURL;
    }

    /**
     * Gets the HTTPClient shared by all services
     */
    getHttp() {
        return this.http;
    }
}
