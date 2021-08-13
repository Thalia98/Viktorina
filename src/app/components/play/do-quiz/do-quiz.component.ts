import { ChallengesService } from 'src/app/services/challenges.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';
import { PAGES } from '../../../globalValues';

@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.scss'],
})
export class DoQuizComponent implements OnDestroy {
  questionnaire: Questionnaire;
  subscription: Subscription;
  indexQuestion: number = 0;
  setInterval: any;
  seconds: number = 0;
  totalPoints: number = 0;
  corrects: number = 0;
  incorrects: number = 0;
  totalSeconds: number = 0;

  loading: boolean = false;

  selectedOption: any;
  IndexSelected: any;
  collectionAnswerUser = [];
  collectionIncorrects = [];
  collectionCorrects = [];

  constructor(
    private platform: Platform,
    public quizService: QuizService,
    private router: Router,
    private challengeService: ChallengesService,
  ) {
    this.questionnaire = this.quizService.questionnaire;
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
    });
    this.playInitialCounter();
  }

  ionViewWillEnter() {
    if (this.seconds != 0) {
      PAGES.forEach(page => {
        if (page.isSelected) {
          this.router.navigate([page.page]);
        }
      });
    }
  }


  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.clearInterval();
  }

  clearInterval() {
    clearInterval(this.setInterval);
  }

  getSeconds() {
    return this.seconds;
  }

  getTitle() {
    return this.questionnaire.collectionQuestions[this.indexQuestion].title;
  }

  playInitialCounter() {
    this.seconds = this.questionnaire.collectionQuestions[this.indexQuestion].second;
    this.setInterval = setInterval(() => {
      if (this.seconds === 0) {
        this.addAnswer();
      }
      this.seconds--;
    }, 1000);
  }

  selectedAnswer(answer, index) {
    this.selectedOption = answer;
    this.IndexSelected = index;
  }

  addClassOption(answer) {
    if (answer === this.selectedOption) {
      return 'selected-question';
    } else {
      return '';
    }
  }

  next() {
    clearInterval(this.setInterval);
    this.addAnswer();
    this.playInitialCounter();
  }

  addAnswer() {
    this.incrementAnswerCounter();

    const userResponse = {
      title: this.questionnaire.collectionQuestions[this.indexQuestion].title,
      totalPoints: this.getPoints(),
      seconds: this.getSecondsResponse(),
      indexAnswerSelected: this.getSelectedIndex(),
      collectionAnswer: this.questionnaire.collectionQuestions[this.indexQuestion].collectionAnswer,
      totalSeconds: this.totalSeconds,
    };

    this.setCollectionIncorrects();
    this.setCollectionCorrects();

    this.collectionAnswerUser.push(userResponse);

    this.selectedOption = undefined;
    this.IndexSelected = undefined;

    if (this.questionnaire.collectionQuestions.length - 1 === this.indexQuestion) {
      this.saveQuestionnaireAnswer();
    } else {
      this.indexQuestion++;
      this.seconds = this.questionnaire.collectionQuestions[this.indexQuestion].second;
    }
  }

  getPoints() {
    const questionPoints = this.questionnaire.collectionQuestions[this.indexQuestion].point;

    if (this.selectedOption === undefined) {
      return 0;
    }

    if (this.selectedOption.isCorrect === true) {
      this.totalPoints += questionPoints;
      return questionPoints;
    } else {
      return 0;
    }
  }

  getSecondsResponse() {
    const secondsQuestion = this.questionnaire.collectionQuestions[this.indexQuestion].second;

    if (this.selectedOption === undefined) {
      this.totalSeconds += secondsQuestion;

      return 'No respondido';
    } else {

      const secondsAnswered = secondsQuestion - this.seconds;
      this.totalSeconds += secondsAnswered;

      return secondsAnswered.toString();
    }
  }

  getSelectedIndex() {
    if (this.selectedOption === undefined) {
      return '';
    } else {
      return this.IndexSelected;
    }
  }

  setCollectionIncorrects() {
    if (this.selectedOption === undefined || !this.selectedOption?.isCorrect) {
      this.collectionIncorrects.push(this.questionnaire.collectionQuestions[this.indexQuestion].title);
    }
  }

  setCollectionCorrects() {
    if (this.selectedOption?.isCorrect) {
      this.collectionCorrects.push(this.questionnaire.collectionQuestions[this.indexQuestion].title);
    }
  }

  incrementAnswerCounter() {
    if (this.selectedOption === undefined || !this.selectedOption?.isCorrect) {
      this.incorrects++;
    } else if (this.selectedOption?.isCorrect) {
      this.corrects++;
    }
  }

  saveQuestionnaireAnswer() {
    this.loading = true;

    let user: User = JSON.parse(localStorage.getItem('user'));

    const questionnaireAnswer = {
      id: this.questionnaire.id,
      nameUser: user.username,
      date: new Date(),
      numberQuestions: this.questionnaire.numberQuestions,
      corrects: this.corrects,
      incorrects: this.incorrects,
      totalPoints: this.totalPoints,
      collectionAnswerUser: this.collectionAnswerUser,
      collectionIncorrects: this.collectionIncorrects,
      collectionCorrects: this.collectionCorrects
    };

    this.quizService.setResponseUser(questionnaireAnswer).then(res => {
      this.loading = false;

      if (this.quizService.multiplayer) {
        if (this.questionnaire.isUser1) {
          this.challengeService.updateChallengeStateUser1(this.questionnaire.id).then(() => { }, error => { });
        } else {
          this.challengeService.updateChallengeStateUser2(this.questionnaire.id).then(() => { }, error => { });
        }

        this.router.navigate(['play/answer-user-challenge', this.questionnaire.id]);
      } else {
        this.router.navigate(['play/answer-user', res.id]);
      }
    }, error => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    });
  }

}
