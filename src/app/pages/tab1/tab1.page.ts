import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { IArticle } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: IArticle[] = [];

  constructor(private noticiasService: NoticiasService) {

  }

  ngOnInit(): void {
    this.noticiasService.getTopHeadLines().subscribe(response => {
      this.noticias.push(...response.articles);
    });
  }

}
