import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { EditComponent } from './edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Management'
    },
    children: [
      {
        path: 'create',
        component: EditComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'edit'
        }
      },
      {
        path: '',
        component: ListComponent,
        data: {
          title: ''
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}





