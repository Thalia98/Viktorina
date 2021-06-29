import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from '../../models/Question';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],
})
export class ListQuestionComponent implements OnInit {

  collectionQuestions: Question[] = [];

  constructor(
    private quizService: QuizService,
  ) {
    this.quizService.getQuestions().subscribe(res => {
      this.collectionQuestions.push(res);
    });
  }

  ngOnInit() {
  }

  remove(index) {
    this.collectionQuestions.splice(index, 1);
  }

}
