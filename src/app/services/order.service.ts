import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { ExtractTabDataPipe } from '../pipes/extract-tab-data.pipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "http://localhost:8000"
  
  constructor(private http: HttpClient) { }

  getCart(): Observable<Order[]> {
    return this.http.get<{ success: boolean, data: Order[] }>(`${this.url}/purchases/cart/all`).pipe(
      map(response => new ExtractTabDataPipe().transform(response)) 
    );
  }

  getPaidOrders(): Observable<Order[]> {
    return this.http.get<{ success: boolean, data: Order[] }>(`${this.url}/purchases/paid/all`).pipe(
      map(response => new ExtractTabDataPipe().transform(response)) 
    );
  }

  getOrder(id: number): Observable<Order | null> {
    return this.http.get<{ success: boolean, data: Order }>(`${this.url}/purchases/${id}`).pipe(
      map(response => response.success ? response.data : null),
      catchError(() => of(null))
    );
  }

  getDeliveries(): Observable<Order[]> {
    return this.http.get<{ success: boolean, data: Order[] }>(`${this.url}/purchases/deliveries/all`).pipe(
      map(response => new ExtractTabDataPipe().transform(response)) 
    );
  }

  addOrder(data: any) {
    return this.http.post(`${this.url}/purchases`, data);
  }

  buyOrder(id: number, data: any) {
    return this.http.put(`${this.url}/purchases/${id}`, data);
  }

  finishOrder(id: number) {
    const data = {};
    return this.http.put(`${this.url}/purchases/${id}`, data);
  }

  validateOrder(id: number) {
    const data = {};
    return this.http.put(`${this.url}/purchases/${id}`, data);
  }

  delOrder(id: number) {
    return this.http.delete(`${this.url}/purchases/${id}`);
  }
}
