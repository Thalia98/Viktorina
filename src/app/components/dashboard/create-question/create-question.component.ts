import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { ERROR_FORM } from '../../../globalValues';
import { Answer } from '../../models/Answer';
import { Question } from '../../models/Question';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {

  title: string;
  description: string;
  category: string;
  formGroup: FormGroup;
  showError: boolean = false;
  errorMessage: string;
  collectionAnswer = ['answer1', 'answer2', 'answer3', 'answer4'];
  collectionAnswerModel: Answer[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private quizService: QuizService
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      seconds: [10, Validators.required],
      points: [1000, Validators.required],
      answer1: this.formBuilder.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required]
      }),
      answer2: this.formBuilder.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required]
      }),
      answer3: this.formBuilder.group({
        title: '',
        isCorrect: false
      }),
      answer4: this.formBuilder.group({
        title: '',
        isCorrect: false
      }),
    });
  }

  ngOnInit() {
  }

  get seconds() {
    return this.formGroup.get('seconds').value;
  }

  get points() {
    return this.formGroup.get('points').value;
  }

  setFalseAnswer(numberType) {
    this.collectionAnswer.forEach(answer => {
      if (answer !== 'answer' + numberType) {
        this.formGroup.get(answer).patchValue({
          isCorrect: false
        });
      }
    });
  }

  areAllAnswerIncorrect() {
    let allIncorrect = true;
    this.collectionAnswer.forEach(answer => {
      if (this.formGroup.get(answer).get('isCorrect').value === true) {
        allIncorrect = false;
      }
    });

    return allIncorrect;
  }

  areCorrectAnswerDescriptionNull() {
    let correctAnswerDescriptionNull = false;

    this.collectionAnswer.forEach(answer => {
      if (this.formGroup.get(answer).get('isCorrect').value === true && !this.formGroup.get(answer).get('title').value) {
        correctAnswerDescriptionNull = true;
      }
    });

    return correctAnswerDescriptionNull;
  }

  error() {
    this.showError = true;

    setTimeout(() => {
      this.showError = false;
    }, 3500);
  }

  setCorrectValue(numberType) {
    this.setFalseAnswer(numberType);

    this.formGroup.get('answer' + numberType).patchValue({
      isCorrect: !this.isCorrectValue(numberType)
    });
  }

  isCorrectValue(numberType) {
    return this.formGroup.get('answer' + numberType).get('isCorrect').value;
  }

  nameIcon(numberType) {
    if (this.isCorrectValue(numberType)) {
      return 'checkmark-circle';
    } else {
      return 'ellipse-outline';
    }
  }

  sumMinusSeconds(operation) {
    if ((this.seconds + operation) <= 4) {
      return;
    }

    this.formGroup.patchValue({
      seconds: this.seconds + operation
    })
  }

  saveAnswer() {
   this.collectionAnswerModel = [];

    this.collectionAnswer.forEach(answer => {
      if (this.formGroup.get(answer).get('title').value) {
        this.collectionAnswerModel.push({
          description: this.formGroup.get(answer).get('title').value,
          isCorrect: this.formGroup.get(answer).get('isCorrect').value
        });
      }
    });
    this.saveQuestion();
  }

  saveQuestion() {
    let question: Question = {
      title: this.formGroup.get('title').value,
      point: this.formGroup.get('points').value,
      second: this.formGroup.get('seconds').value,
      collectionAnswer: this.collectionAnswerModel
    };

    this.quizService.addQuestion(question);
    this.reset();
  }

  reset() {
    this.formGroup.patchValue({
      title: '',
      seconds: 10,
      points: 1000,
      answer1: {
        title: '',
        isCorrect:false
      },
      answer2: {
        title: '',
        isCorrect:false
      },
      answer3: {
        title: '',
        isCorrect:false
      },
      answer4: {
        title: '',
        isCorrect:false
      },
    });
  }

  addQuestion() {
    if (this.formGroup.invalid) {
      this.errorMessage = ERROR_FORM.ERROR_DATA;
      this.error();
    } else if (this.areAllAnswerIncorrect() || this.areCorrectAnswerDescriptionNull()) {
      this.errorMessage = ERROR_FORM.ERROR_CORRECT_ANSWER;
      this.error();
    } else {
      this.saveAnswer();
    }
  }

}
