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
  isMyQuestionnaires: boolean = true;
  loading: boolean = false;
  collectionQuestionnaire: Questionnaire[] = [];

  suscriptionQuestionnaire: Subscription = new Subscription();

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (params.isMyQuestionnaires === 'false') {
        this.isMyQuestionnaires = false;
        this.getQuestionnaires();
      } else {
        this.isMyQuestionnaires = true;
        let user: User = JSON.parse(localStorage.getItem('user'));
        this.getQuestionnaires(user.uid);
      }
    });
  }

  ngOnDestroy() {
    this.suscriptionQuestionnaire.unsubscribe();
  }


  getQuestionnaires(uid?) {
    if (uid) {
      this.suscriptionQuestionnaire == this.quizService.getQuestionnaireByUser(uid).subscribe(res => {
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
    } else {
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

  }

}
