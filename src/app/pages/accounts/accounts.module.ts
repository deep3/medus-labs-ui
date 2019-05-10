import { AccountRoutingModule } from './accounts-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { DataTableModule } from 'angular-6-datatable';
import { AccountComponent } from './accounts.component';

@NgModule({
    imports: [
      DataTableModule,
      FormsModule,
      AccountRoutingModule,
      BsDropdownModule,
      ButtonsModule.forRoot(),
      CommonModule

    ],
    exports: [
      ],
    providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy} ],
    declarations: [AccountComponent ]
  })
  export class AccountsModule { }

