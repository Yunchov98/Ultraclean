import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UltracleanServicesComponent } from './ultraclean-services/ultraclean-services.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CleaningRequestsComponent } from './cleaning-requests/cleaning-requests.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { JobRequestsComponent } from './job-requests/job-requests.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceResolver } from './service-details/service-details.reselover';
import { ErrorPageComponent } from './error-page/error-page.component';
import { isUserGuard } from './core/guards/is-user.guard';
import { isAdminGuard } from './core/guards/is-admin.guard';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditServiceResolver } from './edit-service/edit-service-resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'services',
    component: UltracleanServicesComponent,
  },
  {
    path: 'application',
    canActivate: [isUserGuard],
    component: JoinUsComponent,
  },
  {
    path: 'booking-form',
    canActivate: [isUserGuard],
    component: BookingFormComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'cleaning-requests',
    canActivate: [isAdminGuard],
    component: CleaningRequestsComponent,
  },
  {
    path: 'add-service',
    canActivate: [isAdminGuard],
    component: AddServiceComponent,
  },
  {
    path: 'job-requests',
    canActivate: [isAdminGuard],
    component: JobRequestsComponent,
  },
  {
    path: 'service/details/:id',
    resolve: { service: ServiceResolver },
    component: ServiceDetailsComponent,
  },
  {
    path: 'service/edit/:id',
    canActivate: [isAdminGuard],
    resolve: { service: EditServiceResolver },
    component: EditServiceComponent,
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
