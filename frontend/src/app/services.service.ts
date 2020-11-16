import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ServicesService {

  url = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  registerService(a) {
    return this.http.post(`${this.url}/create`, a, {headers: {'Content-type': 'application/json'}});
  }

}
