import { DeploymentRoutingModule } from './deployment-routing.module';
import { DeploymentComponent } from './deployment.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataTableModule } from 'angular-6-datatable';


@NgModule({
    imports: [
      DataTableModule,
      FormsModule,
      DeploymentRoutingModule,
      BsDropdownModule,
      ButtonsModule.forRoot(),
      CommonModule,
    ],
    exports: [],
    providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy} ],
    declarations: [ DeploymentComponent ]
  })
  export class DeploymentModule { }

