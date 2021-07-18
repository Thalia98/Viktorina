import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {

  id: string;
  loading: boolean = false;
  collectionUserResponse: any[] = [];
  responseQuestionnaire: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnDestroy(): void {
    this.responseQuestionnaire.unsubscribe();
  }

  ngOnInit() {
    this.getResponseByQuestionnaireId();
  }

  ionViewWillLeave() {
    this.responseQuestionnaire.unsubscribe();
  }

  getResponseByQuestionnaireId() {
    this.loading = true;
    this.responseQuestionnaire = this.quizService.getResponseByQuestionnaireId(this.id).subscribe(res => {
      this.loading = false;
      this.collectionUserResponse = [];

      res.forEach(item => {
        this.collectionUserResponse.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });

      console.log(this.collectionUserResponse);

    }, error => {
      this.loading = false;
    });
  }

}
