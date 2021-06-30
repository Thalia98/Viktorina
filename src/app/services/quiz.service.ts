import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { Question } from '../components/models/Question';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private questions = new Subject<Question>();
    title: string;
    description: string;
    category: string;
    urlImage: string;
    file: [];

    constructor(
        private firestore: AngularFirestore,
        private storage: AngularFireStorage
    ) { }

    addQuestion(question: Question) {
        this.questions.next(question);
    }

    getQuestions(): Observable<Question> {
        return this.questions.asObservable();
    }

    saveQuestionnaire(questionnaire): Promise<any> {
        return this.firestore.collection('Questionnaries').add(questionnaire);
    }

    homeworkCloudStorage(nombreArchivo: string, datos: any) {
        return this.storage.upload(nombreArchivo, datos);
    }

    referenceCloudStorage(nombreArchivo: string) {
        return this.storage.ref(nombreArchivo);
    }
}