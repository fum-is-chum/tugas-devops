import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeId from '@angular/common/locales/id';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './common-components/app-header/app-header.module';
import { NotificationAlertModule } from './common-components/notification-alert/notification-alert.module';
import { HttpInterceptorService } from './utils/http-interceptor';
registerLocaleData(localeId, 'id');
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,

    // modules
    AppHeaderModule,
    NotificationAlertModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: "id-ID" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
