
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../models/livre.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private apiUrl = 'http://localhost:8081/api/livres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiUrl);
  }

  getById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.apiUrl}/${id}`);
  }

  add(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl, livre);
  }

  update(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.apiUrl}/${id}`, livre);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByAuteur(idAuteur: number): Observable<Livre[]> {
    return this.http.get<Livre[]>(
      `${this.apiUrl}/auteur/${idAuteur}`
    );
  }
}
