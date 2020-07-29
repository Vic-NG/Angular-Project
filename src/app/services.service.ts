import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  registerService(a) {
    return this.http.post('http://localhost:3000/formRegisterSchema', a);
  }

}
