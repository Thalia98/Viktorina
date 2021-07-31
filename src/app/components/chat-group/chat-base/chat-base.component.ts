import { AddUserComponent } from './../../modals/add-user/add-user.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PAGES } from '../../../globalValues';

@Component({
  selector: 'app-chat-base',
  templateUrl: './chat-base.component.html',
  styleUrls: ['./chat-base.component.scss'],
})
export class ChatBaseComponent implements OnInit {

  collectionFriends: any = [];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  goBack() {
    PAGES.forEach(page => {
      if (page.isSelected) {
        this.router.navigate(['/dashboard/' + page.page]);
      }
    });
  }

  async openAddUserModal() {
    const modal = await this.modalCtrl.create({
      component: AddUserComponent,
      cssClass: 'modal-small'
    });
    return await modal.present();
  }

  async openPetitionsUserModal() {
    const modal = await this.modalCtrl.create({
      component: AddUserComponent,
      cssClass: 'modal-small'
    });
    return await modal.present();
  }

}
