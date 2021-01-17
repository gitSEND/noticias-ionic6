import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRespuestaTopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) {

  }

  getTopHeadLines() {
    return this.http.get<IRespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=1a997624c6f74ca9b3c49ea0c8445bb7`);
  }
}
