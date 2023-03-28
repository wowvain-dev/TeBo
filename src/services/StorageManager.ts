import { Letter } from "@/types/Letter";
import litere from "@/assets/json/litere.json";

export class Letters {
    static letters: Array<Letter> = new Array();

    static initialize(): void {
        litere.letters.forEach((val) => {
            this.letters.push({
                audioPath: val.recording,
                character: val.letter
            } as Letter);
        });
    }
}

export class StorageManager {

}