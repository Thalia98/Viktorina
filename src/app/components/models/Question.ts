import { Answer } from "./Answer";

export class Question {
    title: string;
    point: number;
    second: number;
    collectionAnswer: Answer[];

    constructor(title, point, second, collectionAnswer) {
        this.title = title;
        this.point = point;
        this.second = second;
        this.collectionAnswer = collectionAnswer;
    }
}