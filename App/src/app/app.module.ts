import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClientModule } from '@angular/common/http';
import { CleaningRequestsComponent } from './cleaning-requests/cleaning-requests.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
