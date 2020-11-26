import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReminderService } from '../../services/reminder.service';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ],
  providers: [ReminderService]
})
export class HomeModule { }
