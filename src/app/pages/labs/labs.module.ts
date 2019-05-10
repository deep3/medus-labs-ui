import { LabBuilderRoutingModule } from './labs-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { DataTableModule } from 'angular-6-datatable';
import { LabsListComponent } from './labs-list.component';
import { LabBuilderComponent } from './lab-builder.component';
import { DeployedListComponent } from './deployed-list.component';
import { DeletedListComponent } from './deleted-list.component';
import { LogListComponent } from './lab-logs.component';


@NgModule({
    imports: [
      CommonModule,
      DataTableModule,
      FormsModule,
      LabBuilderRoutingModule,
      BsDropdownModule,
      ButtonsModule.forRoot(),
    ],
    exports: [
      ],
    providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy} ],
    declarations: [ LabBuilderComponent, LabsListComponent, DeployedListComponent, DeletedListComponent,
      LogListComponent
    ]
  })
  export class LabsModule { }

