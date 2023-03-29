import { Letter } from "@/types/Letter";
import litere from "@/assets/json/litere.json";

export class Letters {
    letters: Array<Letter> = new Array();

    constructor() { this.initialize() }

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

export class StorageManager {
    letters: Letters = new Letters(); 
}
