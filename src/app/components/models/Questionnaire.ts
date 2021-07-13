import { Question } from "./Question";

export class Questionnaire {
    title: string;
    collectionQuestions: Question[];
    uid: string;
    description: string;
    numberQuestions: number;
    createDate: Date;
    category: string;
    urlImage: string;
    level: string;
    totalTime: number;
    isSeconds: boolean;
    id?;

    constructor(title, collectionQuestions, description, uid, numberQuestions, createDate, category, urlImage, level, totalTime, isSeconds) {
        this.title = title;
        this.collectionQuestions = collectionQuestions;
        this.description = description;
        this.uid = uid;
        this.numberQuestions = numberQuestions;
        this.createDate = createDate;
        this.category = category;
        this.urlImage = urlImage;
        this.level = level;
        this.totalTime = totalTime;
        this.isSeconds = isSeconds;
    }
}