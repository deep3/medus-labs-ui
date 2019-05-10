import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DeploymentComponent } from './deployment.component';


const routes: Routes = [
  {
    path: ':id',
    component: DeploymentComponent,
    data: {
      title: 'Lab Deployment'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeploymentRoutingModule {}

