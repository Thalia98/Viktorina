import { QuizService } from './../../../services/quiz.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { STATES_CHALLENGE } from '../../../globalValues';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges-petitions.component.html',
  styleUrls: ['./challenges-petitions.component.scss'],
})
export class ChallengesPetitionsComponent {

  user: any;
  collectionPetitions: any[] = [];
  collectionQuestionsRandom: any[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private modalCtrl: ModalController,
    private challengeService: ChallengesService,
    private quizService: QuizService
  ) { }

  ionViewWillEnter() {
    this.getMyPetitions();
  }

  getMyPetitions() {
    this.challengeService.getMyPetitions(this.user.id).subscribe(petition => {
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
    }, error => { });
  }

  removePetition(index) {
    this.collectionPetitions[index].friendsPetitioner.forEach(userFriend => {
      if (userFriend.friendId === this.user.id) {
        userFriend.challenge = false;
      }
    });

    this.user.friends.forEach(userFriend => {
      if (userFriend.friendId === this.collectionPetitions[index].userPetitionerId) {
        userFriend.challenge = false;
      }
    });

    this.chatService.setFriends(this.user.id, this.user.friends).then(() => {
      this.chatService.setFriends(this.collectionPetitions[index].userPetitionerId, this.collectionPetitions[index].friendsPetitioner).then(() => {
        this.challengeService.removePetition(this.collectionPetitions[index].id).then(() => { }, error => { });
        this.collectionPetitions.splice(index, 1);
      }, error => { });
    }, error => { });
  }

  addGame(index) {
    this.getCollectionQuestionRandom(index);
  }

  getCollectionQuestionRandom(index) {
    let collectionQuestions = [];
    this.quizService.getAllQuestionnairesOnceTime().subscribe(questionnaires => {
      questionnaires.forEach(questionnaire => {
        questionnaire.data().collectionQuestions.forEach(question => {
          collectionQuestions.push(question);
        });
      });

      this.collectionQuestionsRandom = this.shuffleArray(collectionQuestions);

      const game = {
        collectionQuestions: this.collectionQuestionsRandom,
        userId1: this.user.id,
        username1: this.user.username,
        userId2: this.collectionPetitions[index].userPetitionerId,
        username2: this.collectionPetitions[index].usernamePetitioner,
        stateUser1: STATES_CHALLENGE.PENDING,
        stateUser2: STATES_CHALLENGE.PENDING,
        winner: '',
      };

      this.challengeService.addChallengeGame(game).then(() => {
        this.removePetition(index);
      }, error => { });
    });
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    if (array.length > 10) {
      array.splice(0, (array.length - 10));
    }

    return array;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
