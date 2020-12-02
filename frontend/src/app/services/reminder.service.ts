import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ReminderService {

  url = 'http://localhost:3000/reminders'

  teste = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': this.teste
    })
  };


  constructor(private http: HttpClient) {}

  getReminders() {
    return this.http.get(`${this.url}`, this.httpOptions);
  }

  newReminder(x) {
    return this.http.post(`${this.url}/new`, x, this.httpOptions);
  }

  updateReminder(x) {
    return this.http.put(`${this.url}/update`, x,  this.httpOptions);
  }

  deleteReminder(_id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/delete/${_id}`, this.httpOptions);
  }
}
