export enum LetterType {
    vowel, consonant
}

export class Letter {
    character: string | null;
    audioPath: string | null;

    constructor(character: string, audioPath: string) {
        this.character = character, this.audioPath = audioPath;
    }

    
    public get letterType() : LetterType {
        if (['a','e','i','o','u','ă','î','â'].indexOf(this.character?.toLowerCase() ?? ' ') !== -1) return LetterType.vowel;
        return LetterType.consonant;
    }

    toString(): string {
        return this.character ?? '';
    }
    
}