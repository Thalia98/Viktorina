import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { ICONS_NAME, TEXT_RESULT } from '../../../globalValues';
import { Friends } from '../../models/Firends';
import { FriendsPetitions } from '../../models/FriendsPetitions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  loading: boolean = false;
  username: string;
  userReceiver: User;
  user = JSON.parse(localStorage.getItem('user'));
  isFound: boolean = false;
  showResult: boolean = false;
  nameIconResult: string = ICONS_NAME.CLOSE;
  textResult: string = TEXT_RESULT.USER_NOT_FOUND;
  collectionFriendsPetition: FriendsPetitions[] = [];
  collectionFriends: Friends[] = [];

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getMySendPetition();
    this.getMyFriends();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  searchUser() {
    this.loading = true;
    this.showResult = true;

    if (this.username !== this.user.username) {
      this.userService.getUserByUsername(this.username).subscribe(user => {
        if (user.length > 0) {
          this.userReceiver = {
            id: user[0].payload.doc.id,
            ...user[0].payload.doc.data()
          }
          this.checkIfISend();
        } else {
          this.userReceiver = undefined;
          this.isFound = false;
          this.setResult(TEXT_RESULT.USER_NOT_FOUND);
        }
      }, error => {
        this.loading = false;
        this.userReceiver = undefined;
        this.isFound = false;
        this.setResult(TEXT_RESULT.USER_NOT_FOUND);
      });
    } else {
      this.userReceiver = undefined;
      this.isFound = false;
      this.setResult(TEXT_RESULT.USER_NOT_FOUND);
    }

    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  setResult(result) {

    switch (result) {
      case TEXT_RESULT.USER_FOUND:
        this.nameIconResult = ICONS_NAME.CHECK;
        this.textResult = TEXT_RESULT.USER_FOUND;
        break;
      case TEXT_RESULT.USER_NOT_FOUND:
        this.nameIconResult = ICONS_NAME.CLOSE;
        this.textResult = TEXT_RESULT.USER_NOT_FOUND;
        break;
      case TEXT_RESULT.USER_SEND:
        this.nameIconResult = ICONS_NAME.CLOSE;
        this.textResult = TEXT_RESULT.USER_SEND;
        break;
      case TEXT_RESULT.USER_FRIEND:
        this.nameIconResult = ICONS_NAME.CLOSE;
        this.textResult = TEXT_RESULT.USER_FRIEND;
        break;
    }
  }

  sendPetition() {
    const friendPetition: FriendsPetitions = {
      userPetitionerId: this.user.id,
      userReceiverId: this.userReceiver.id
    };

    this.userService.sendPetition(friendPetition).then(res => {
      this.closeModal();
    }, error => { });
  }

  getMySendPetition() {
    this.userService.getMySendPetitions(this.user.id).subscribe(friendsPetitions => {
      friendsPetitions.forEach(element => {
        this.collectionFriendsPetition.push({
          ...element.payload.doc.data()
        });
      });
    }, error => { });
  }

  getMyFriends() {
    this.userService.getMySendPetitions(this.user.id).subscribe(friends => {
      friends.forEach(element => {
        this.collectionFriends.push({
          ...element.payload.doc.data()
        });
      });
    }, error => { });
  }

  checkIfISend() {
    this.isFound = true;
    this.collectionFriendsPetition.forEach(petition => {
      if (petition.userReceiverId === this.userReceiver.id) {
        this.isFound = false;
      }
    });

    if (this.isFound) {
      this.checkIfIsMyFriend();
    } else {
      this.setResult(TEXT_RESULT.USER_SEND);
    }
  }

  checkIfIsMyFriend() {
    this.isFound = true;
    this.collectionFriends.forEach(friend => {
      if (friend.user1Id === this.userReceiver.id || friend.user2Id === this.userReceiver.id) {
        this.isFound = false;
      }
    });

    if (this.isFound) {
      this.setResult(TEXT_RESULT.USER_FOUND);
    } else {
      this.setResult(TEXT_RESULT.USER_FRIEND);
    }
  }

}
