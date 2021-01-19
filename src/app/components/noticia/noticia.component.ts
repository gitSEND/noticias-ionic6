import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: IArticle;
  @Input() indice: number;
  @Input() enFavoritos: boolean;

  constructor(
    private iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) {}

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrarBtn;

    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar favorito',
        icon: 'trash',
        handler: () => {
          console.log('Delete Favorite clicked');
          this.dataLocalService.borrarNoticia(this.noticia);
        },
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
        },
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Comparir',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
            this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
          },
        },
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
