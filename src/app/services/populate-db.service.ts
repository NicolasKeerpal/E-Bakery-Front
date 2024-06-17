import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PopulateDbService {
  url = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  populateDB() {
    const data = {};
    return this.http.post(`${this.url}/populate-db`, data);
  }
}
