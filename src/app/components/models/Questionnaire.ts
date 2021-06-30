import { Question } from "./Question";

export class Questionnaire {
    title: string;
    collectionQuestions: Question[];
    // id: number;
    uid: string;
    description: string;
    numberQuestions: number;
    createDate: Date;
    category: string;
    urlImage: string;

    constructor(title, collectionQuestions, description, uid, numberQuestions, createDate, category, urlImage) {
        this.title = title;
        this.collectionQuestions = collectionQuestions;
        // this.id = id;
        this.description = description;
        this.uid = uid;
        this.numberQuestions = numberQuestions;
        this.createDate = createDate;
        this.category = category;
        this.urlImage = urlImage;
    }
}