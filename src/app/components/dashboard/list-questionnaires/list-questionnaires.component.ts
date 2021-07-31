import { FilterComponent } from './../../modals/filter/filter.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { FilterService } from 'src/app/services/filter.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent {
  loading: boolean = false;
  collectionQuestionnaire: Questionnaire[] = [];
  collectionQuestionnaireSearch: Questionnaire[] = [];
  collectionQuestionnaireFilter: Questionnaire[] = [];

  orderFilter: boolean = false;
  isFilter: boolean = false;
  searchedWord: string;

  suscriptionQuestionnaire: Subscription = new Subscription();

  constructor(
    public quizService: QuizService,
    private filterService: FilterService,
    private modalCtrl: ModalController,
  ) { }

  ionViewWillEnter() {
    this.loading = true;
    this.removeFilter();
    this.getQuestionnaires();
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


  getQuestionnaires() {
    this.suscriptionQuestionnaire == this.quizService.getAllQuestionnaires().subscribe(res => {
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
      console.log(error);
      this.loading = false;
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
        if (data?.data) {
          this.isFilter = data.data['isFilter'];
          this.collectionQuestionnaire = data.data['collection'];
          this.collectionQuestionnaireSearch = data.data['collection'];
        }
      });

    return await modal.present();
  }
}
