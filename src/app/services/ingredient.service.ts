import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient';
import { ExtractTabDataPipe } from '../pipes/extract-tab-data.pipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  url = "http://localhost:8000"
  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<{ success: boolean, data: Ingredient[] }>(`${this.url}/ingredients`).pipe(
      map(response => new ExtractTabDataPipe().transform(response)) 
    );
  }

  getIngredient(id: number): Observable<Ingredient | null> {
    return this.http.get<{ success: boolean, data: Ingredient }>(`${this.url}/ingredients/${id}`).pipe(
      map(response => response.success ? response.data : null),
      catchError(() => of(null))
    );
  }

  addIngredient(data: any) {
    return this.http.post(`${this.url}/ingredients`, data);
  }

  putIngredient(id: number, data: any) {
    return this.http.put(`${this.url}/ingredients/${id}`, data);
  }

  delIngredient(id: number) {
    return this.http.delete(`${this.url}/ingredients/${id}`);
  }
}
