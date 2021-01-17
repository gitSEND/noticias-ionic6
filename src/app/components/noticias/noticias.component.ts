import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: IArticle[];
  constructor() { }

  ngOnInit() { }

}
