import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from '../components/models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
    private questions = new Subject<Question>();

    addQuestion(question: Question) {
        this.questions.next(question);
    }

    getQuestions(): Observable<Question> {
        return this.questions.asObservable();
    }
}