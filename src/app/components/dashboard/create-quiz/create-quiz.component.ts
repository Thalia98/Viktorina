import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() { }

  next() {
    if (this.formGroup.invalid) {
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3500);
    }
  }

}
