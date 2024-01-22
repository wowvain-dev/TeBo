export class CheckSentence {
    sentence: string | null;
    correct: boolean | null;

    constructor(sentence: string, correct: boolean) {
        this.sentence = sentence, this.correct = correct;
    }
}
