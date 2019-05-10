
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpHandler} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule } from 'angular-6-datatable';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AwsApiService } from './api/aws/aws-api.service';
import { LabsApiService } from './api/labs/labs-api.service';
import { OrganisationsApiService } from './api/organisations/organisations-api.service';
import { UsersApiService } from './api/user/users-api.service';
import { UserManagementDataService } from './data-service/user-management-data.service';
import { PageTemplateComponent } from './containers/page-template/page-template.component';
import { AppRoutingModule} from './app.routing';
import { P404Component } from './pages/error/404.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpRequestInterceptor } from './http-request.interceptor';
import { ModalOptionsComponent } from './pages/modal/modal-options';
import { ModalConfigurationComponent } from './pages/modal/modal-configuration';
import { GenericErrorComponent } from './pages/error/GenericError.component';
import { ErrorDataService } from './data-service/error-data.service';
import { ConfigDataService } from './data-service/configuration-data.service';
import { SetupComponent } from './pages/setup/setup.component';
import { DeploymentResponseDataService } from './data-service/deployment-response-data.service';
import { ModalCreatedMemberAccountsComponent } from './pages/modal/modal-createdmemberaccounts';
import { ToastrModule } from 'ngx-toastr';
import { ModalUndeployLabComponent } from './pages/modal/modal-undeploylab';
import { AwsRegionConverter } from './aws-region-converter.pipe';
import { PasswordExpiredComponent } from './pages/login/password-expired.component';
import { ModalCreatedUserComponent } from './pages/modal/modal-createdstudent';
import { CleanupComponent } from './pages/cleanup/cleanup.component';
import { ModalWipedAllComponent } from './pages/modal/modal-wiped-all/modal-wiped-all.component';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@NgModule({
  declarations: [
    AppComponent,
    P404Component,
    GenericErrorComponent,
    LoginComponent,
    PageTemplateComponent,
    ModalOptionsComponent,
    ModalConfigurationComponent,
    SetupComponent,
    ModalCreatedMemberAccountsComponent,
    ModalUndeployLabComponent,
    AwsRegionConverter,
    PasswordExpiredComponent,
    ModalCreatedUserComponent,
    CleanupComponent,
    ModalWipedAllComponent,
  ],
  entryComponents: [ModalCreatedMemberAccountsComponent,
     ModalOptionsComponent, ModalConfigurationComponent,
      ModalUndeployLabComponent, ModalCreatedUserComponent, ModalWipedAllComponent, NgbModalBackdrop],
  imports: [
    HttpClientModule,
    DataTableModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    FormsModule, ReactiveFormsModule
  ],
  providers: [
              HttpClientModule,
              AwsApiService,
              OrganisationsApiService,
              LabsApiService,
              UsersApiService,
              UserManagementDataService,
              ConfigDataService,
              ErrorDataService,
              DeploymentResponseDataService,
              ModalOptionsComponent,
              ModalConfigurationComponent,
              ModalUndeployLabComponent,
              ModalCreatedUserComponent,
              NgbActiveModal,



     { provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true}
    ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
