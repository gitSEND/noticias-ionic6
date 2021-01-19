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
  topHeadLines = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadLines() {
    this.topHeadLines++;
    return this.ejecutarQuery<IRespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.topHeadLines}`);
  }

  getTopHeadLinesByCategories(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<IRespuestaTopHeadLines>(
      `/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`
    );
  }
}
