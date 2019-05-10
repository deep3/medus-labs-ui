
import { Environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { DeploymentResponseDataService } from './data-service/deployment-response-data.service';
import * as SockJS from 'sockjs-client';
declare var require: any;

@Injectable({
    providedIn: 'root',
  })

export class SocketService {

    private client: any;
    private Stomp = require('stompjs');
    private socket: any;
    private currentUser: any;
    private _postsURL = Environment.apiUrl;
    private msgRespArr: string[] = [];

    constructor (private dataService: DeploymentResponseDataService) {}

   /**
    * Initialises a new socket client
    */
   initClient() {
        this.msgRespArr = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.socket = new SockJS(this._postsURL + 'status');
        this.client = this.Stomp.over(this.socket);
        const _this = this;

        this.client.connect({Authorization: this.currentUser.token}, function (frame) {
            _this.client.subscribe('/update/message', function (response) {
                _this.updateStorage(response.body);
            });
        });

    }

    /**
     * Gets the current Socket client
     */
    getClient() {
        return this.client;
    }

    /**
     * Updates local socket client with new data
     * @param body Data to use to update socket
     */
    updateStorage(body) {
        const bodyParse = JSON.parse(body);
        if (bodyParse.hasOwnProperty('StackName')) {
            this.msgRespArr.push(body);
        }
        const removeDuplicates = this.msgRespArr;

        const distinctData = Array.from(new Set(removeDuplicates));
        sessionStorage.setItem('storage', JSON.stringify(distinctData));
        this.dataService.receivedNewMessage(body);
    }

    /**
     * Method to disconnect from API Socket
     */
    disconnect() {
        if (this.client != null) {
          this.client.disconnect();
        }
    }
}
