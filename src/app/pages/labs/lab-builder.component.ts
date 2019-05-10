import { Component, OnInit  } from '@angular/core';
import { LabsApiService } from '../../api/labs/labs-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'lab-builder.component.html'
})
export class LabBuilderComponent implements OnInit {

    constructor(private labsApi: LabsApiService) { }

    ngOnInit(): void {
        this.labsApi.getLabBuilderServices();
    }
 }
