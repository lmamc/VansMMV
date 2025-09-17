import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private apiUrl = 'http://localhost:8180/pagos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(pago: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pago);
  }

  update(id: number, pago: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pago);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}