import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { LabBuilderComponent } from './lab-builder.component';
import { LabsListComponent } from './labs-list.component';
import { DeployedListComponent } from './deployed-list.component';
import { DeletedListComponent } from './deleted-list.component';
import { LogListComponent } from './lab-logs.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Labs'
    },
    children: [
      {
        path: 'builder',
        component: LabBuilderComponent,
        data: {
          title: 'Lab Builder'
        },
      },
      {
        path: '',
        component: LabsListComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'active',
        component: DeployedListComponent,
        data: {
          title: 'Currently Deployed Labs'
        }
      },
      {
        path: 'deleted',
        component: DeletedListComponent,
        data: {
          title: 'Deleted Labs'
        },
      },
      {
        path: 'logs/:id',
        component: LogListComponent,
        data: {
          title: 'Logs'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabBuilderRoutingModule {}

