import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { Question } from '../components/models/Question';
import { Questionnaire } from '../components/models/Questionnaire';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private questions = new Subject<Question>();
    title: string;
    description: string;
    category: string;
    level: string;
    urlImage: string;
    file: [];
    questionnaire: Questionnaire;
    isInProcess: boolean = false;

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

    getQuestionnaireByUser(uid): Observable<any> {
        return this.firestore.collection('Questionnaries', ref => ref.where('uid', '==', uid)).snapshotChanges();
    }

    getAllQuestionnaires(): Observable<any> {
        return this.firestore.collection('Questionnaries').snapshotChanges();
    }

    getQuestionnaire(id): Observable<any> {
        return this.firestore.collection('Questionnaries').doc(id).get();
    }

    removeQuestionnaire(id): Promise<any> {
        return this.firestore.collection('Questionnaries').doc(id).delete();
    }

    getImage(urlImage) {
        if (urlImage) {
          return urlImage;
        } else {
          return 'assets/icon/sin_foto.png';
        }
      }
}