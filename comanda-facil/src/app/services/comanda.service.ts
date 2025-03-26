import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  private apiUrl = 'http://192.168.0.121:3000/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  newOrder(mesa: number, comanda: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { mesa, comanda });
  }
}