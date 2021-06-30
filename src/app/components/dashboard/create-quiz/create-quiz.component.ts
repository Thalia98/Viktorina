import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {

  formGroup: FormGroup;
  showError: boolean = false;
  categoryCollection = [
    'Otro',
    'Informática',
    'Deporte',
    'Historia',
    'Arte',
    'Ciencia',
    'Geografía',
    'Cultura general'
  ];

  nombreArchivo;
  urlImage;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private quizService: QuizService
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      file: [],
    });
  }

  ngOnInit() { }

  public changeFile(event) {
    this.quizService.file = event.target.files[0];
  }

  next() {
    if (this.formGroup.invalid) {
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3500);
    } else {
      this.quizService.title = this.formGroup.get('title').value;
      this.quizService.description = this.formGroup.get('description').value;
      this.quizService.category = this.formGroup.get('category').value;

      this.router.navigate(['/dashboard/createQuestions']);
    }
  }

}
