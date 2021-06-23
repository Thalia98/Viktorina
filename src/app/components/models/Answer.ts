export class Answer {
    description: string;
    isCorrect: boolean;

    constructor(description, isCorrect) {
        this.description = description;
        this.isCorrect = isCorrect;
    }
}