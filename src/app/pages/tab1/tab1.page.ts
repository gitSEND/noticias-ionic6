import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { IArticle } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  noticias: IArticle[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadLines().subscribe((response) => {
      if (response.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...response.articles);

      if (event) {
        event.target.complete();
      }
    });
  }
}
