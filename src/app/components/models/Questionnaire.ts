import { Question } from "./Question";

export class Questionnaire {
    title: string;
    collectionQuestions: Question[];
    id: number;
    uid: string;
    description: string;
    code: string;
    numberQuestions: number;
    createDate: Date;

    constructor(title, collectionQuestions, id, description, uid, code, numberQuestions, createDate) {
        this.title = title;
        this.collectionQuestions = collectionQuestions;
        this.id = id;
        this.description = description;
        this.uid = uid;
        this.code = code;
        this.numberQuestions = numberQuestions;
        this.createDate = createDate;
    }
}