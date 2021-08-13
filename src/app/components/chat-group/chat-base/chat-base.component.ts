import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { PetitionsComponent } from './../petitions/petitions.component';
import { AddUserComponent } from './../../modals/add-user/add-user.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PAGES } from '../../../globalValues';
import { User } from 'src/app/interfaces/User';
import { ChatComponent } from '../../modals/chat/chat.component';

@Component({
  selector: 'app-chat-base',
  templateUrl: './chat-base.component.html',
  styleUrls: ['./chat-base.component.scss'],
})
export class ChatBaseComponent {

  collectionFriends: any = [];
  user = JSON.parse(localStorage.getItem('user'));
  countPetitions: number = 0;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ionViewWillEnter() {
    this.getUser();
  }

  goBack() {
    PAGES.forEach(page => {
      if (page.isSelected) {
        this.router.navigate([page.page]);
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

  async openChatModal(index) {
    const modal = await this.modalCtrl.create({
      component: ChatComponent,
      componentProps: {
        chatFriend: this.collectionFriends[index],
        user: this.user
      }
    });
    return await modal.present();
  }

  getMyPetitions() {
    this.chatService.getMyPetitions(this.user.id).subscribe(res => {
      this.countPetitions = res.length;
    }, error => { });
  }

  getUser() {
    this.userService.getUserById(this.user.id).subscribe(user => {
      const userInterface: User = {
        id: user.id,
        ...user.data()
      };

      this.user = userInterface;

      localStorage.setItem('user', JSON.stringify(userInterface));

      this.getMyPetitions();
      this.getMyFriends();
    })
  }

  getMyFriends() {
    this.collectionFriends = [];

    this.user.friends.forEach(friend => {
      this.userService.getUserById(friend.friendId).subscribe(userFriend => {
        this.chatService.getChatGroup(friend.chatGroupId).subscribe(chat => {
          let find = false;

          this.collectionFriends.forEach((res, index) => {
            if (res.chatGroupId === chat.payload.id) {
              find = true;
              this.collectionFriends[index].chat = chat.payload.data().chat;
            }
          });

          if (!find) {
            this.collectionFriends.push({
              usernameFriend: userFriend.data().username,
              chatGroupId: chat.payload.id,
              ...chat.payload.data(),
            });
          }

        }, error => { });
      }, error => { });
    });
  }

}
