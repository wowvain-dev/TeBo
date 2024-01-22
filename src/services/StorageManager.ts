import {Letter} from "@/types/Letter";
import {CheckSentence} from "@/types/CheckSentence";
import propozitii_json from "@/assets/json/check_sentences.json";
import litere_json from "@/assets/json/litere.json";
import paragrafe_json from "@/assets/json/completare_paragrafe.json";
import llamas from "@/assets/json/llama.json";
import {Paragraph} from "@/types/Paragraph";

export class Letters {
    letters: Array<Letter> = [];

    constructor() {
        this.initialize()
    }

    initialize(): void {
        litere_json.letters.forEach((val) => {
            this.letters.push(
                new Letter(val.letter, val.recording)
            );
            // {
            //     audioPath: val.recording,
            //     character: val.letter
            // } as Letter);
        });
    }
}

export class Paragraphs {
    paragraphs: Array<Paragraph> = [];

    constructor() {
        this.initialize();
    }

    initialize(): void {
        paragrafe_json.forEach((val) => {
            this.paragraphs.push(
                new Paragraph(val.content, val.author, val.title, val.answers)
            )
        })
    }
}

export class CheckSentences {
    check_sentences: Array<CheckSentence> = [];

    constructor() {
        this.initialize()
    }

    initialize(): void {
        propozitii_json.propozitii.forEach((val) => {
            this.check_sentences.push(
                new CheckSentence(val.string, val.answear)
            )
        })
    }
}

export const llama = llamas;

/// I KNOW THE STRUCTURE IS KIND OF SHIT HERE, IT IS WHAT IT IS, NO TIME TO REFACTOR ¯\_(ツ)_/¯
export class StorageManager {
    letters = new Letters();
    check_sentences = new CheckSentences();
    paragraphs = new Paragraphs();
}
