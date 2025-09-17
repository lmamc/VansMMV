import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsientosService {
  private apiUrl = 'http://localhost:8080/asientos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(asiento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, asiento);
  }

  update(id: number, asiento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, asiento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}