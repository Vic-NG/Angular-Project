import { AuthInterceptor } from './../../guard/auth.interceptor';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReminderService } from '../../services/reminder.service';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [ReminderService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class HomeModule { }
