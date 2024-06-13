import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  addCustomer(data: any) {
    return this.http.post(`${this.url}/customers`, data);
  }
}
