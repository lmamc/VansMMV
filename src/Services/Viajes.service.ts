import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  private apiUrl = 'http://localhost:8080/viajes';

  constructor(private http: HttpClient) { }

  getViajesPorConcierto(conciertoId: number): Observable<any[]> {
    // Asumiendo que tu backend puede filtrar viajes por concierto.
    // Si no, necesitarías ajustar el backend o filtrar en el frontend.
    return this.http.get<any[]>(`${this.apiUrl}?conciertoId=${conciertoId}`);
  }

  createViaje(viaje: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, viaje);
  }
}