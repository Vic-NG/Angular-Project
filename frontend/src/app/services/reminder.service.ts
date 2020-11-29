import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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

  deleteReminder(_id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/delete/${_id}`);
  }
}
