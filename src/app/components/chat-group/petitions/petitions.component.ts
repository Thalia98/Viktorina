import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { ChatGroups } from '../../models/ChatGroup';

@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss'],
})
export class PetitionsComponent {

  user = JSON.parse(localStorage.getItem('user'));
  collectionPetitions: any[] = [];

  constructor(
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  ionViewWillEnter() {
    this.getMyPetitions();
  }

  getMyPetitions() {
    this.chatService.getMyPetitions(this.user.id).subscribe(petition => {
      petition.forEach(element => {
        this.userService.getUserById(element.payload.doc.data().userPetitionerId).subscribe(user => {
          this.collectionPetitions.push({
            id: element.payload.doc.id,
            userPetitionerId: element.payload.doc.data().userPetitionerId,
            usernamePetitioner: user.data().username,
            friendsPetitioner: user.data().friends,
          });

        });
      });
    });
  }

  addFriend(index) {
    this.chatService.setFriends(this.user.id, this.user.friends).then(() => {
      this.chatService.setFriends(this.collectionPetitions[index].userPetitionerId, this.collectionPetitions[index].friendsPetitioner).then(() => {
        this.removePetition(index);
      }, error => { });
    }, error => { });
  }

  removePetition(index) {
    this.chatService.removePetition(this.collectionPetitions[index].id).then(() => {}, error => {});
    this.collectionPetitions.splice(index, 1);
  }

  addChatGroup(index) {
    const chatGroup: ChatGroups = {
      chat: []
    }

    this.chatService.addChatGroup(chatGroup).then(res => {

      this.user.friends.push({
        friendId: this.collectionPetitions[index].userPetitionerId,
        chatGroupId: res.id,
        challenge: false,
      });

      this.collectionPetitions[index].friendsPetitioner.push({
        friendId: this.user.id,
        chatGroupId: res.id,
        challenge: false,
      });

      this.addFriend(index);
    });
  }

}
