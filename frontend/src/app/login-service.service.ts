import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  loginApplication(x){
    return this.http.post(`${this.url}/auth`, x, { headers: {'Content-type': 'application/json'}})
  }

}
