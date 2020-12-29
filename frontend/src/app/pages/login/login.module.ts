import { AuthInterceptor } from './../../guard/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from '../../services/login-service.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [LoginService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})

export class LoginModule { }
