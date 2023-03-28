enum LetterType {
    vowel, consonant
}

export class Letter {
    character: string | null;
    audioPath: string | null;

    constructor(character: string, audioPath: string) {
        this.character = character, this.audioPath = audioPath;
    }

    
    public get letterType() : LetterType {
        if ("aeiouăîâ".includes(this.character ?? ' ')) return LetterType.vowel;
        return LetterType.consonant;
    }

    toString(): string {
        return this.character ?? '';
    }
    
}