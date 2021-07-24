import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent {
  loading: boolean = false;
  collectionQuestionnaire: Questionnaire[] = [];

  suscriptionQuestionnaire: Subscription = new Subscription();

  constructor(
    public quizService: QuizService,
  ) { }

  ionViewWillEnter() {
    this.loading = true;
    this.getQuestionnaires();
  }

  ngOnDestroy() {
    this.suscriptionQuestionnaire.unsubscribe();
  }


  getQuestionnaires() {
    this.suscriptionQuestionnaire == this.quizService.getAllQuestionnaires().subscribe(res => {
      this.collectionQuestionnaire = [];
      res.forEach(element => {
        this.collectionQuestionnaire.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });

      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }

  order() {}
}
