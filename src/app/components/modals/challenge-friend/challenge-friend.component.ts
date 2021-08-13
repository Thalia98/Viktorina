import { PopupService } from './../../../services/popup.service';
import { ChallengesService } from './../../../services/challenges.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { RESPONSES } from 'src/app/globalValues';

@Component({
  selector: 'app-challenge-friend',
  templateUrl: './challenge-friend.component.html',
  styleUrls: ['./challenge-friend.component.scss'],
})
export class ChallengeFriendComponent {

  collectionFriends: any = [];
  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private challengeService: ChallengesService,
    private popupService: PopupService,
    private chatService: ChatService,
  ) { }

  ionViewWillEnter() {
    this.getMyFriends();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getMyFriends() {
    this.collectionFriends = [];

    this.user.friends.forEach(friend => {
      this.userService.getUserById(friend.friendId).subscribe(userFriend => {
        let find = false;

        this.collectionFriends.forEach((res, index) => {
          find = true;
          this.collectionFriends[index].usernameFriend = userFriend.data().username;
        });

        if (!find) {
          this.collectionFriends.push({
            usernameFriend: userFriend.data().username,
            friendsUser: userFriend.data().friends,
            idFriend: friend.friendId,
            challenge: friend.challenge
          });
        }
      }, error => { });
    });
  }

  sendPetition(index) {
    const message = '¿Estás segur@ de querer retar a ' + this.collectionFriends[index].usernameFriend + '?';

    this.popupService.alertConfirm('Retar', message).then(res => {
      if (res === RESPONSES.OK) {
        const challengePetition = {
          userPetitionerId: this.user.id,
          userReceiverId: this.collectionFriends[index].idFriend
        };

        this.challengeService.sendChallengePetition(challengePetition).then(res => {
          this.updateFriendsChallenge(index);
        }, error => { });
      }
    });
  }

  updateFriendsChallenge(index) {
    this.collectionFriends[index].friendsUser.forEach(userFriend => {
      if (userFriend.friendId === this.user.id) {
        userFriend.challenge = true;
      }
    });

    this.user.friends.forEach(userFriend => {
      if (userFriend.friendId === this.collectionFriends[index].idFriend) {
        userFriend.challenge = true;
      }
    });

    this.chatService.setFriends(this.user.id, this.user.friends).then(() => {
      this.chatService.setFriends(this.collectionFriends[index].idFriend, this.collectionFriends[index].friendsUser).then(() => {
        this.getMyFriends();
      }, error => { });
    }, error => { });
  }
}
