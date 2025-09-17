import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConciertosService {
  private apiUrl = 'http://localhost:8080/conciertos';

  constructor(private http: HttpClient) { }

  getConciertos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getConciertoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createConcierto(concierto: any): Observable<any> {
    // El payload debe coincidir con lo que espera el backend
    // Ejemplo: { "empresa": { "empresa_id": 6 }, "banda": { "banda_id": 3 }, ... }
    return this.http.post<any>(this.apiUrl, concierto);
  }
}