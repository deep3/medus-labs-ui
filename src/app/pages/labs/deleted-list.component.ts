import { Component, OnInit } from '@angular/core';
import { DeployedLabActivity } from '../../data-models/active-lab-activity.model';
import { Router } from '@angular/router';
import { LabsApiService } from '../../api/labs/labs-api.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-deleted-list',
  templateUrl: './deleted-list.component.html'
})
export class DeletedListComponent implements OnInit {
  public labsLoading = true;
  private DELETED_LABS: DeployedLabActivity[] = [];

  constructor(private labsApi: LabsApiService,
              private router: Router) { }

  ngOnInit() {
   this.getDeletedLabs();
  }

  /**
   * Methos returning a boolean to indicate whether the component state is loading or not
   */
  isLoading() {
    return this.labsLoading;
  }

  /**
   * Method to get a list of Deleted Labs
   */
  getDeletedLabs() {

    this.labsLoading = true;

    if (this.DELETED_LABS == null) {
      this.DELETED_LABS = [];
    }

    this.labsApi.getDeletedLabs().then((result) => {
      const resultArr = Object.keys(result).map(function(resultIndex) {
        const resultObj = result[resultIndex];
        return resultObj;
    });

    for (const index of resultArr) {

      const existingLab = this.DELETED_LABS.filter(e => e.id === index.id);

      if (existingLab === null || existingLab.length === 0) {
        this.DELETED_LABS.push(index);
      } else {
        const ind = this.DELETED_LABS.indexOf(existingLab[0]);
        this.DELETED_LABS[ind] = index;
      }
    }
      timer(10000).subscribe(() => this.getDeletedLabs());
    }).then((result) => {
      this.labsLoading = false;
    });
  }

  /**
  * Returns a boolean indicating whether there are any deleted Labs in the linked AWS Environment
  */
  isDeletedLabsZero() {
    return this.DELETED_LABS.length === 0;
  }

  /**
   * Method that navigates to a new page shwing logs for this item
   * @param item The DeletedLog Item
   */
  onGetLogs(item) {
    this.router.navigate(['/labs/logs/' + item.id]);
  }

}
