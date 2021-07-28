import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LEVEL, CATEGORIES } from '../../../globalValues';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {

  formGroup: FormGroup;
  showError: boolean = false;

  levelCollection: any[] = LEVEL;
  categoryCollection: any[] = CATEGORIES;

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
      level: ['', Validators.required],
      file: [],
    });
  }

  ngOnInit() {
    this.quizService.file = null;
   }

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
      this.quizService.level = this.formGroup.get('level').value;

      this.router.navigate(['/dashboard/createQuestions']);
    }
  }

}
