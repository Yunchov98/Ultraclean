import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UltracleanServicesComponent } from './ultraclean-services/ultraclean-services.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CleaningRequestsComponent } from './cleaning-requests/cleaning-requests.component';

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
    component: JoinUsComponent,
  },
  {
    path: 'booking-form',
    component: BookingFormComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'cleaning-requests',
    component: CleaningRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
