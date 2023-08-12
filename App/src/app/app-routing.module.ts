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
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { WorkersComponent } from './workers/workers.component';

import { isUserGuard } from './core/guards/is-user.guard';
import { isAdminGuard } from './core/guards/is-admin.guard';

import { ServiceResolver } from './service-details/service-details.reselover';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductsComponent } from './products/products.component';

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
    resolve: { service: ServiceResolver },
    component: EditServiceComponent,
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
  },
  {
    path: 'our-team',
    component: WorkersComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'uc',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
