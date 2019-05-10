import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { DataTableModule } from 'angular-6-datatable';
import { FontAwesomeBoolPipe } from '../../font-awesome-bool.pipe';
import { UsersRoutingModule } from './users-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [
      DataTableModule,
      FormsModule,
      UsersRoutingModule,
      BsDropdownModule,
      ButtonsModule.forRoot(),
      CommonModule

    ],
    exports: [
      ],
    providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy} ],
    declarations: [ ListComponent, EditComponent, FontAwesomeBoolPipe ]
  })
  export class UsersModule { }


