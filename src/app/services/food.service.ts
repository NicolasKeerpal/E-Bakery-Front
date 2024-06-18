import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Food } from '../models/food';
import { Ingredient } from '../models/ingredient';
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

  addFood(data: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    formData.append('image', image);

    return this.http.post(`${this.url}/foods`, formData);
  }

  addCompositions(foodId: number, composition: Ingredient[]): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => observer.error('Token not found'));
    }

    const promises = composition.map(ingredient => {
      const compositionData = {
        foodId,
        ingredientId: ingredient.id
      };
      return this.http.post(`${this.url}/compositions`, compositionData, {
        headers: {
          Authorization: token
        }
      }).toPromise();
    });

    return from(Promise.all(promises));
  }

  putFood(id: number, data: any, image: File | null) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('addStock', data.addStock.toString());
    if (image) {
      formData.append('image', image);
    }

    return this.http.put(`${this.url}/foods/${id}`, formData);
  }

  delFood(id: number) {
    return this.http.delete(`${this.url}/foods/${id}`);
  }
}
