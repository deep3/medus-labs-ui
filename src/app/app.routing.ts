import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTemplateComponent } from './containers/page-template/page-template.component';
import { P404Component } from './pages/error/404.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { GenericErrorComponent } from './pages/error/GenericError.component';
import { SetupComponent } from './pages/setup/setup.component';
import { PasswordExpiredComponent } from './pages/login/password-expired.component';
import { CleanupComponent } from './pages/cleanup/cleanup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: GenericErrorComponent,
    data: {
      title: 'Page Gen Error'
    }
  },
  {
    path: 'setup',
    component: SetupComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Setup'
    }
  },
  {
    path: 'cleanup',
    component: CleanupComponent,
    data: {
      title: 'Wipe All Data'
    }
  },

  {
    path: 'passwordexpired',
    component: PasswordExpiredComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Password Expired'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: PageTemplateComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule'
      },
      {
        path: 'deployment',
        loadChildren: './pages/deployment/deployment.module#DeploymentModule'
      },
      {
        path: 'labs',
        loadChildren: './pages/labs/labs.module#LabsModule',
      },
      {
        path: 'accounts',
        loadChildren: './pages/accounts/accounts.module#AccountsModule',
      }
    ]
  },
  {
    path: '**',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
