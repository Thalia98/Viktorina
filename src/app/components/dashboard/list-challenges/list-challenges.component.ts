import { QuizService } from 'src/app/services/quiz.service';
import { ChallengeFriendComponent } from './../../modals/challenge-friend/challenge-friend.component';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengesService } from 'src/app/services/challenges.service';
import { STATES_CHALLENGE, RESULT_CHALLENGE } from '../../../globalValues';

@Component({
  selector: 'app-list-challenges',
  templateUrl: './list-challenges.component.html',
  styleUrls: ['./list-challenges.component.scss'],
})
export class ListChallengesComponent {

  tabChoose: string = 'in Progress';
  collectionChallengesInProgress: any[] = [];
  collectionChallengesFinished: any[] = [];
  user = JSON.parse(localStorage.getItem('user'));
  STATES_CHALLENGE = STATES_CHALLENGE;
  RESULT_CHALLENGE = RESULT_CHALLENGE;

  constructor(
    private modalCtrl: ModalController,
    private challengeService: ChallengesService,
    private quizService: QuizService,
  ) { }

  ionViewWillEnter() {
    this.getMyGames();
  }

  async openModalAddFriendChallenge() {
    const modal = await this.modalCtrl.create({
      component: ChallengeFriendComponent
    });
    return await modal.present();
  }

  getMyGames() {
    this.challengeService.getMyChallengesUser1(this.user.id).subscribe(challenges1 => {
      this.challengeService.getMyChallengesUser2(this.user.id).subscribe(challenges2 => {
        this.collectionChallengesInProgress = [];
        this.collectionChallengesFinished = [];

        this.getData(challenges1);
        this.getData(challenges2);

      }, error => { });
    }, error => { });
  }

  getData(challenges) {
    challenges.forEach(challenge => {
      if (challenge.payload.doc.data().winner === '') {
        if (challenge.payload.doc.data().userId1 === this.user.id) {
          this.pushCollectionChallengesInProgress(
            challenge.payload.doc.data().userId2,
            challenge.payload.doc.data().username2,
            challenge.payload.doc.data().collectionQuestions,
            challenge.payload.doc.data().stateUser1,
            challenge.payload.doc.id, true);
        } else {
          this.pushCollectionChallengesInProgress(
            challenge.payload.doc.data().userId1,
            challenge.payload.doc.data().username1,
            challenge.payload.doc.data().collectionQuestions,
            challenge.payload.doc.data().stateUser2,
            challenge.payload.doc.id, false);
        }
      } else {
        let iAmAWinner;
        if (challenge.payload.doc.data().winner != 'null') {
          iAmAWinner = challenge.payload.doc.data().winner === this.user.username ? RESULT_CHALLENGE.WINNER : RESULT_CHALLENGE.LOSER;
        } else {
          iAmAWinner = RESULT_CHALLENGE.TIE;
        }

        if (challenge.payload.doc.data().userId1 === this.user.id) {
          this.pushCollectionChallengesFinished(iAmAWinner, challenge.payload.doc.data().username2);
        } else {
          this.pushCollectionChallengesFinished(iAmAWinner, challenge.payload.doc.data().username1);
        }
      }
    });
  }

  pushCollectionChallengesFinished(iAmAWinner, opponentUsername) {
    this.collectionChallengesFinished.push({
      iAmAWinner: iAmAWinner,
      opponentUsername: opponentUsername
    });
  }

  pushCollectionChallengesInProgress(userId, username, collectionQuestions, myState, id, isUser1) {
    this.collectionChallengesInProgress.push({
      userChallengedId: userId,
      userChallengedUsername: username,
      collectionQuestions: collectionQuestions,
      myState: myState,
      id: id,
      isUser1: isUser1
    });
  }

  setCollectionQuestion(index) {
    this.quizService.questionnaire = {
      id: this.collectionChallengesInProgress[index].id,
      category: '',
      createDate: new Date(),
      description: '',
      isSeconds: false,
      level: '',
      numberQuestions: this.collectionChallengesInProgress[index].collectionQuestions.length,
      title: '',
      totalTime: 0,
      uid: this.user.id,
      urlImage: '',
      collectionQuestions: this.collectionChallengesInProgress[index].collectionQuestions,
      isUser1: this.collectionChallengesInProgress[index].isUser1
    }
  }

}
