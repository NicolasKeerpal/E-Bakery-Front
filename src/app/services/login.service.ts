import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8000";
  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(`${this.url}/login`, credentials);
  }
}
