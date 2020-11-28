import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class ReminderService {

  url = 'http://localhost:3000/reminders'

  constructor(private http: HttpClient) {}



  getReminders() {
    return this.http.get(`${this.url}`);
  }

  newReminder(x) {
    return this.http.post(`${this.url}/new`, x, {headers: {'Content-type': 'application/json'}});
  }

  updateReminder(x) {
    return this.http.put(`${this.url}/update`, x, {headers: {'Content-type': 'application/json'}});
  }

  deleteReminder() {
    return this.http.delete(`${this.url}/delete/:id`);
  }
}
