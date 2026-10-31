import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auteur } from '../models/auteur.model';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  private apiUrl = 'http://localhost:8081/api/auteurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(this.apiUrl);
  }

  getById(id: number): Observable<Auteur> {
    return this.http.get<Auteur>(`${this.apiUrl}/${id}`);
  }

  add(auteur: Auteur): Observable<Auteur> {
    return this.http.post<Auteur>(this.apiUrl, auteur);
  }

  update(id: number, auteur: Auteur): Observable<Auteur> {
    return this.http.put<Auteur>(`${this.apiUrl}/${id}`, auteur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
