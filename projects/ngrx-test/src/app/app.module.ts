import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaxsListComponent } from './taxs-list/taxs-list.component';
import { StoreModule } from './store/store.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AttachTokenInterceptor } from './shared/interceptors/attach-token.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TaxsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengModule,
    StoreModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
