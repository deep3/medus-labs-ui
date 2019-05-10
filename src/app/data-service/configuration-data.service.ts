import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ConfigDataService  {

private configNameMS = new BehaviorSubject(null);

configDataName = this.configNameMS;

  constructor() {}
    /**
     * Provides a way of sending the configurationModel via the Service
     * @param configName The Configuration Name
     */
    sendConfigModel(configName) {
        this.configNameMS.next(configName);
    }
}
