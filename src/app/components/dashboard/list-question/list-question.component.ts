import { User } from './../../../interfaces/User';
import { Questionnaire } from './../../models/Questionnaire';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from '../../models/Question';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],
})
export class ListQuestionComponent implements OnInit {

  collectionQuestions: Question[] = [];
  title: string;
  description: string;
  category: string;
  file;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.quizService.getQuestions().subscribe(res => {
      this.collectionQuestions.push(res);
    });

    this.title = this.quizService.title;
    this.description = this.quizService.description;
    this.category = this.quizService.category;
    this.file = this.quizService.file;
  }

  ngOnInit() {
    if (this.title === '' || this.description === '') {
      this.router.navigate(['/dashboard']);
    }
  }

  remove(index) {
    this.collectionQuestions.splice(index, 1);
  }

  uploadImage() {
    this.quizService.homeworkCloudStorage(this.file.name, this.file).then(res => {
      let reference = this.quizService.referenceCloudStorage(this.file.name);
      reference.getDownloadURL().subscribe((URL) => {
        this.quizService.urlImage = URL;
        this.finalize();
      });
    }).catch(error => {
      console.log(error);
      this.finalize();
    })
  }

  finalize() {
    let user: User = JSON.parse(localStorage.getItem('user'));

    let questionnaire: Questionnaire = {
      uid: user.uid,
      title: this.title,
      description: this.description,
      category: this.category,
      collectionQuestions: this.collectionQuestions,
      numberQuestions: this.collectionQuestions.length,
      createDate: new Date(),
      urlImage: this.quizService.urlImage
    };

    this.quizService.saveQuestionnaire(questionnaire).then(res => {
      console.log(res);
    }).catch(error => {

    });

    this.toastr.success('Cuestionario registrado')
    this.router.navigate(['/dashboard']);
  }

}
