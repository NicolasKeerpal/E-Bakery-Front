import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable, catchError, map, of } from 'rxjs';
import { ExtractTabDataPipe } from '../pipes/extract-tab-data.pipe';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<{ success: boolean, data: Customer[] }>(`${this.url}/customers`).pipe(
      map(response => new ExtractTabDataPipe().transform(response)) 
    );
  }

  addCustomer(data: any) {
    return this.http.post(`${this.url}/customers`, data);
  }

  getCustomer(id: number): Observable<Customer | null> {
    return this.http.get<{ success: boolean, data: Customer }>(`${this.url}/customers/${id}`).pipe(
      map(response => response.success ? response.data : null),
      catchError(() => of(null))
    );
  }

  putCustomer(id: number, data: any) {
    return this.http.put(`${this.url}/customers/${id}`, data);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<{ success: boolean, data: Customer[] }>(`${this.url}/customers`).pipe(
      map(response => response.success ? response.data : []),
      catchError(() => of([]))
    ); 
  }
}
