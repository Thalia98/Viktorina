import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RESPONSES } from '../globalValues';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor(private alertCtrl: AlertController) { }

    async alertConfirm(header, message): Promise<any> {
        return new Promise(async (resolve) => {
          const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (cancel) => {
                  resolve(RESPONSES.KO);
                }
              }, {
                text: 'Sí',
                handler: (ok) => {
                  resolve(RESPONSES.OK);
                }
              }
            ]
          });
          alert.present();
        });
      }

}