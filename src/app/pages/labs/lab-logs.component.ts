import { Component, OnInit } from '@angular/core';
import { DeployedLabActivity } from '../../data-models/active-lab-activity.model';
import { LabsApiService } from '../../api/labs/labs-api.service';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './lab-logs.component.html'
})

export class LogListComponent implements OnInit {
  public logsLoading = true;
  LOGS: any[] = [];
  private selectedLab: DeployedLabActivity;

  constructor(private labsApi: LabsApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getLogs(this.route.snapshot.paramMap.get('id'));
  }

  /**
  * Returns whether the data is still being fetched from the API
  */
  isLoading() {
    return this.logsLoading;
  }

  /**
  * Returns a list of Logs from the API by a given Lab ID
  * @param id The Lab ID to use
  */
  getLogs(id) {
    this.logsLoading = true;

          this.labsApi.getDeployedLabLogs(id).then((result) => {
              const resultArr = Object.keys(result).map(function(resultIndex) {
                const resultObj = result[resultIndex];
                return resultObj;
              });

              for (const index of resultArr) {
                 if (this.LOGS.filter(l => l.id === index.id).length === 0) {
                   this.LOGS.push(index);
                 }
              }

              this.logsLoading = false;
          });

      timer(10000).subscribe(() => this.getLogs(id));

  }

  /**
   * Method executed when print button is clicked
   */
  onPrint() {
    window.print();
  }
}
