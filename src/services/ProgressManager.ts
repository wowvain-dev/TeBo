

export class ExerciseProgress {
    total: number = 0;
    current: number = 0;

    constructor(current: number, total: number) {
        this.current = current;
        this.total = total;
    }

    abs_current() {
        return this.current > this.total ? this.total : this.current;
    }

    percentage() { 
        return (this.current > this.total ? this.total : this.current) * 100 / this.total;
    }

}

export class CollectionProgress {
    parts: Map<string, ExerciseProgress> = new Map;

    total() {
        let total= 0;
        this.parts.forEach((val) => {total += val.total});
        return total;
    }

    current() {
        let current = 0;
        this.parts.forEach((val) => {current += val.abs_current()});
        return current > this.total() ? this.total() : current;
    }

    percentage() {
        let current = this.current();
        let total = this.total();

        return (current > total ? total : current) * 100 / total;
    }
}

export class SubjectProgress {
    parts: Map<string, CollectionProgress> = new Map;

    constructor() {}

    total() {
        let total: number = 0;
        this.parts.forEach(val => total += val.total())
        return total;
    }

    current() {
        let current: number = 0;
        this.parts.forEach(val => current += val.current());
        return current >= this.total() ? this.total() : current;
    }

    percentage() {
        let current = this.current();
        let total = this.total();

        return (current > total ? total : current) * 100 / total;
    }
}

export class LevelProgress {
    comunicare: SubjectProgress = new SubjectProgress();
    matematica: SubjectProgress = new SubjectProgress();

    constructor() {}

    total() {
        let total: number = 0;
        this.comunicare.parts.forEach(val => total += val.total());
        this.matematica.parts.forEach(val => total += val.total());
        return total;
    }

    current() {
        let current: number = 0;
        this.comunicare.parts.forEach(val => current += val.current());
        this.matematica.parts.forEach(val => current += val.current());
        // console.log(current);
        return current > this.total() ? this.total() : current;
    }

    percentage() {
        let current = this.current();
        let total = this.total();

        return (current > total ? total : current) * 100 / total;
    }
}

export class ProgressManager {
    level1: LevelProgress = new LevelProgress();
    level2: LevelProgress = new LevelProgress();
    level3: LevelProgress = new LevelProgress();

    setValue(
        level: number, metasubject: string, subject: string, exercise: string, 
        newProgress: ExerciseProgress
        ) {
            if (metasubject === "comunicare") {
                switch (level) {
                    case 1:
                        this.level1.comunicare
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 2:
                        this.level2.comunicare
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 3:
                        this.level3.comunicare
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    default:
                        break;
                }
            } else if (metasubject === "matematica") {
                switch (level) {
                    case 1:
                        this.level1.matematica
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 2:
                        this.level2.matematica
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 3:
                        this.level3.matematica
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    default:
                        break;
                }
            }
        }

        create() {
            this.level1.comunicare.parts.set('romana', new CollectionProgress());
            this.level1.comunicare.parts.get('romana')?.parts
                .set('litere', new ExerciseProgress(0, 31));
            this.level1.comunicare.parts.get('romana')?.parts
                .set('vocale', new ExerciseProgress(0, 31));

            this.level1.matematica.parts.set('aritmetica', new CollectionProgress());
            this.level1.matematica.parts.get('aritmetica')?.parts
                .set('operatii', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('aritmetica')?.parts
                .set('fractii', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('aritmetica')?.parts
                .set('siruri', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('aritmetica')?.parts
                .set('formare', new ExerciseProgress(0, 50));

            this.level1.matematica.parts.set('geometrie', new CollectionProgress());
            this.level1.matematica.parts.get('geometrie')?.parts 
                .set('culori', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('geometrie')?.parts 
                .set('regula_sirului', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('geometrie')?.parts 
                .set('comparare', new ExerciseProgress(0, 50));
        }

        constructor() {
            this.create();
        }
};