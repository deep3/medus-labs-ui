import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AccountComponent } from './accounts.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Accounts'
    },
    children: [
      {
        path: '',
        component: AccountComponent,
        data: {
          title: ''
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}

