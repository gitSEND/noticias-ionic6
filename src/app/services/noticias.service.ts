import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey,
});
@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadLines() {
    return this.ejecutarQuery<IRespuestaTopHeadLines>('/top-headlines?country=us');
  }

  getTopHeadLinesByCategories(categoria: string) {
    return this.ejecutarQuery<IRespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}`);
  }
}
