import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { PopupService } from 'src/app/services/popup.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';
import { ALERT_TEXT, RESPONSES } from '../../../globalValues';
import { ToastrService } from 'ngx-toastr';
import { FilterService } from 'src/app/services/filter.service';
import { FilterComponent } from '../../modals/filter/filter.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-questionnaires',
  templateUrl: './my-questionnaires.component.html',
  styleUrls: ['./my-questionnaires.component.scss'],
})
export class MyQuestionnairesComponent {
  loading: boolean = false;
  isFilter: boolean = false;
  collectionQuestionnaire: Questionnaire[] = [];
  collectionQuestionnaireSearch: Questionnaire[] = [];
  collectionQuestionnaireFilter: Questionnaire[] = [];

  orderFilter: boolean = false;
  searchedWord: string;

  suscriptionQuestionnaire: Subscription = new Subscription();

  constructor(
    public quizService: QuizService,
    private popupService: PopupService,
    private toastr: ToastrService,
    private filterService: FilterService,
    private modalCtrl: ModalController

  ) { }

  ionViewWillEnter() {
    this.loading = true;
    this.isFilter = false;
    this.removeFilter();

    let user: User = JSON.parse(localStorage.getItem('user'));
    this.getQuestionnaires(user.uid);

  }

  ionViewWillLeave() {
    this.removeFilter();
  }

  removeFilter() {
    localStorage.removeItem('categoryCollection');
    localStorage.removeItem('levelCollection');
  }

  ngOnDestroy() {
    this.suscriptionQuestionnaire.unsubscribe();
  }

  getQuestionnaires(uid) {
    this.suscriptionQuestionnaire == this.quizService.getQuestionnaireByUser(uid).subscribe(res => {
      this.collectionQuestionnaire = [];
      this.collectionQuestionnaireSearch = [];
      res.forEach(element => {
        this.collectionQuestionnaire.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      this.collectionQuestionnaireSearch = this.collectionQuestionnaire;
      this.collectionQuestionnaireFilter = this.collectionQuestionnaire;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  removeQuestionnaire(questionnaire) {
    let message = ALERT_TEXT.MESSAGE_REMOVE_QUESTIONNAIRE + questionnaire.title + '"?';
    this.popupService.alertConfirm(ALERT_TEXT.HEADER_REMOVE_QUESTIONNAIRE, message).then(res => {
      if (res === RESPONSES.OK) {
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

  order() {
    this.collectionQuestionnaire = this.filterService.order(this.collectionQuestionnaire, this.orderFilter);

    this.orderFilter = !this.orderFilter;
  }

  search() {
    if (this.searchedWord.length >= 3) {
      this.collectionQuestionnaire = this.filterService.search(this.collectionQuestionnaire, this.searchedWord);
    } else if (this.searchedWord.length === 0) {
      this.collectionQuestionnaire = this.collectionQuestionnaireSearch;
    }
  }

  async openFilterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      componentProps: {
        collection: this.collectionQuestionnaireFilter,
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data?.data) {
          this.isFilter = data.data['isFilter'];
          this.collectionQuestionnaire = data.data['collection'];
          this.collectionQuestionnaireSearch = data.data['collection'];
        }
      });

    return await modal.present();
  }
}
