import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Food } from '../models/food';
import { ExtractTabDataPipe } from '../pipes/extract-tab-data.pipe';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  url = "http://localhost:8000"
  constructor(private http: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<{ success: boolean, data: Food[] }>(`${this.url}/foods`).pipe(
      map(response => new ExtractTabDataPipe().transform(response)) 
    );
  }

  getFood(id: number): Observable<Food | null> {
    return this.http.get<{ success: boolean, data: Food }>(`${this.url}/foods/${id}`).pipe(
      map(response => response.success ? response.data : null),
      catchError(() => of(null))
    );
  }
}
