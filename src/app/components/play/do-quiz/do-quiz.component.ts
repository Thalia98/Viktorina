import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';

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
  selectedOption: any;
  IndexSelected: any;

  constructor(
    private platform: Platform,
    public quizService: QuizService,
    private router: Router,
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
    if (this.questionnaire.collectionQuestions.length - 1 === this.indexQuestion) {
      this.router.navigate(['play/answer-user']);
    } else {
      this.indexQuestion++;
      this.seconds = this.questionnaire.collectionQuestions[this.indexQuestion].second;
    }
  }

}
