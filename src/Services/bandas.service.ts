import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BandasService {
  private apiUrl = 'http://localhost:8180/bandas'; 

  constructor(private http: HttpClient) {}

  getBandas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}