import { User } from './../../../interfaces/User';
import { Questionnaire } from './../../models/Questionnaire';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from '../../models/Question';
import { Router } from '@angular/router';
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
  level: string;
  totalTime: number = 0;
  totalTimeSeconds: number = 0;
  isSeconds: boolean = false;
  file;
  loading: boolean = false;

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
    this.level = this.quizService.level;
    this.file = this.quizService.file;
  }

  ngOnInit() {
    if (this.title === '' || this.description === '') {
      this.router.navigate(['dashboard/myQuestionnaires']);
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
        this.saveQuestionnaire();
      });
    }).catch(() => {
      this.toastr.error('Upps', 'Ha surgido un error subiendo la imagen');
      this.saveQuestionnaire();
    });
  }

  finalize() {
    this.calculateTotalTime();
    if (this.file) {
      this.uploadImage();
    } else {
      this.saveQuestionnaire();
    }
  }

  calculateTotalTime() {
    this.collectionQuestions.forEach(question => {
      this.totalTime += question.second / 60;
      this.totalTimeSeconds += question.second;
    });

    this.totalTime = Math.round(this.totalTime);

    if(this.totalTime === 0) {
      this.totalTime = this.totalTimeSeconds;
      this.isSeconds = true;
    }
  }

  saveQuestionnaire() {
    this.loading = true;

    let user: User = JSON.parse(localStorage.getItem('user'));

    let questionnaire: Questionnaire = {
      uid: user.uid,
      title: this.title,
      description: this.description,
      category: this.category,
      collectionQuestions: this.collectionQuestions,
      numberQuestions: this.collectionQuestions.length,
      createDate: new Date(),
      urlImage: this.quizService.urlImage ? this.quizService.urlImage : '',
      level: this.level,
      totalTime: this.totalTime,
      isSeconds: this.isSeconds
    };

    this.quizService.saveQuestionnaire(questionnaire).then(() => {
      this.toastr.success('Cuestionario registrado')
      this.router.navigate(['dashboard/myQuestionnaires']);
    }).catch(() => {
      this.loading = false;
      this.toastr.error('Upps', 'Ha surgido un error al crear el cuestionario');
    });
  }

}
