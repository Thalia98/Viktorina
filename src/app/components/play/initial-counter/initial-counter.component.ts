import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { PAGES } from '../../../globalValues';

@Component({
  selector: 'app-initial-counter',
  templateUrl: './initial-counter.component.html',
  styleUrls: ['./initial-counter.component.scss'],
})
export class InitialCounterComponent implements OnDestroy {
  counter = 3;
  isHidden = true;
  setInterval: any;
  id: string;

  constructor(
    private router: Router,
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter() {
    if (this.counter === 3) {
      this.isHidden = false;
      this.playInitialCounter();

      if (this.id !== 'null') {
        this.quizService.multiplayer = false;
        this.getQuestionnaire();
      } else {
        this.quizService.multiplayer = true;
      }
    }
  }

  ionViewWillEnter() {
    if (this.counter < 0) {
      this.isHidden = true;

      PAGES.forEach(page => {
        if (page.isSelected) {
          this.router.navigate([page.page]);
        }
      });
    }
  }

  ionViewWillLeave() {
    this.clearInterval();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  clearInterval() {
    clearInterval(this.setInterval);
  }

  getQuestionnaire() {
    this.quizService.getQuestionnaire(this.id).subscribe(questionnaire => {
      this.quizService.questionnaire = {
        id: questionnaire.id,
        ...questionnaire.data()
      };
    });
  }

  playInitialCounter() {
    this.setInterval = setInterval(() => {
      if (this.counter === 0) {
        this.router.navigate(['/play/doQuiz']);
      }

      this.counter--;
    }, 1000);
  }

}
