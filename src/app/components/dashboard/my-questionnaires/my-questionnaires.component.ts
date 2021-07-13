import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { PopupService } from 'src/app/services/popup.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';
import { ALERT_TEXT, RESPONSES } from '../../../globalValues';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-questionnaires',
  templateUrl: './my-questionnaires.component.html',
  styleUrls: ['./my-questionnaires.component.scss'],
})
export class MyQuestionnairesComponent {
  loading: boolean = false;
  collectionQuestionnaire: Questionnaire[] = [];

  suscriptionQuestionnaire: Subscription = new Subscription();

  constructor(
    public quizService: QuizService,
    private popupService: PopupService,
    private toastr: ToastrService
  ) { }

  ionViewWillEnter() {
    this.loading = true;

    let user: User = JSON.parse(localStorage.getItem('user'));
    this.getQuestionnaires(user.uid);

  }

  ngOnDestroy() {
    this.suscriptionQuestionnaire.unsubscribe();
  }


  getQuestionnaires(uid) {
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
  }

  removeQuestionnaire(questionnaire) {
    let message = ALERT_TEXT.MESSAGE_REMOVE_QUESTIONNAIRE + questionnaire.title + '"?';
    this.popupService.alertConfirm(ALERT_TEXT.HEADER_REMOVE_QUESTIONNAIRE, message).then(res => {
      if(res === RESPONSES.OK) {
        this.loading = true;
        this.quizService.removeQuestionnaire(questionnaire.id).then(() => {
          this.loading = false;
          this.toastr.success('¡Ha sido eliminado con éxito!');
        }, error => {
          this.loading = false;
          this.toastr.error('Oops ha ocurrido un error');
        });
      }
    });
  }
}
