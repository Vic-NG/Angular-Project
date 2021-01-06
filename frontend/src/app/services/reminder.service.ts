import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  newReminder(x: any) {
    return this.http.post(`${this.url}/new`, x);
  }

  updateReminder( body: any) {
    return this.http.put(`${this.url}/update`, body);
  }

  deleteReminder(_id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/delete/${_id}`);
  }
}
