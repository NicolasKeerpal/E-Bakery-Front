import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<Employee | null> {
    return this.http.get<{ success: boolean, data: Employee }>(`${this.url}/employees/${id}`).pipe(
      map(response => response.success ? response.data : null),
      catchError(() => of(null))
    );
  }

  putEmployee(id: number, data: any) {
    return this.http.put(`${this.url}/employees/${id}`, data);
  }
}
