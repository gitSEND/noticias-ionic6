import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  segmentSelected = 'business';
  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  articulos: IArticle[] = [];

  constructor(private noticiaService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias(this.segmentSelected);
  }

  cambioCategoria(event) {
    this.articulos = [];
    const categoria = event.detail.value;
    this.segmentSelected = categoria;
    this.cargarNoticias(categoria);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiaService.getTopHeadLinesByCategories(categoria).subscribe((resp) => {
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.articulos.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.cargarNoticias(this.segmentSelected, event);
  }
}
