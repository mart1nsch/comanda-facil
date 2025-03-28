import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  private apiUrl = 'http://192.168.0.121:3000/';

  constructor(private http: HttpClient) { }

  getOrders(route: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + route);
  }

  newOrder(route: string, mesa: number, comanda: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + route, { mesa, comanda });
  }

  deleteOrder(route: string, id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + route, { id });
  }

  finishOrder(route: string, id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + route, { id });
  }

  getItems(route: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + route);
  }

  getProducts(route: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + route);
  }

  newProduct(route: string, descricao: string, vlrUnitario: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + route, { descricao, vlrUnitario });
  }
}