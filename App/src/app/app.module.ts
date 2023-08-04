import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { UserModule } from './user/user.module';
import { UltracleanServicesComponent } from './ultraclean-services/ultraclean-services.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CleaningRequestsComponent } from './cleaning-requests/cleaning-requests.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { environment } from '../environments/environment';
import { JobRequestsComponent } from './job-requests/job-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MainComponent,
    UltracleanServicesComponent,
    JoinUsComponent,
    BookingFormComponent,
    ContactsComponent,
    CleaningRequestsComponent,
    AddServiceComponent,
    JobRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
