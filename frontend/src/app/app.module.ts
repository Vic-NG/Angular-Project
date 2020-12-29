import { AuthInterceptor } from './guard/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { CadastroModule } from './pages/cadastro/cadastro.module';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { TestesComponent } from './pages/testes/testes.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    TestesComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CadastroModule,
    LoginModule,
    HomeModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
