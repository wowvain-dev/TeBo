import {Letter} from "@/types/Letter";
import litere from "@/assets/json/litere.json";
import llamas from "@/assets/json/llama.json";

export class Letters {
    letters: Array<Letter> = [];

    constructor() {
        this.initialize()
    }

    initialize(): void {
        litere.letters.forEach((val) => {
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

export const llama = llamas;

export class StorageManager {
    letters = new Letters();
}