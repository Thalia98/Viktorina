import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Questionnaire } from '../../models/Questionnaire';

@Component({
  selector: 'app-show-questionnaire',
  templateUrl: './show-questionnaire.component.html',
  styleUrls: ['./show-questionnaire.component.scss'],
})
export class ShowQuestionnaireComponent implements OnInit {

  id: string;
  loading: boolean = false;
  questionnaire: Questionnaire;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getQuestionnaire();
   }

  getQuestionnaire() {
    this.loading = true;
    this.quizService.getQuestionnaire(this.id).subscribe(questionnaire => {
      this.loading = false;
      console.log(questionnaire.data());
      this.questionnaire = questionnaire.data();
    }, error => {
      this.loading = false;
    });
  }

}
