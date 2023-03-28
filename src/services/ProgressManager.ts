import { homedir } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

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
    static level1: LevelProgress = new LevelProgress();
    static level2: LevelProgress = new LevelProgress();
    static level3: LevelProgress = new LevelProgress();
    
    static isThereProgress: boolean = false;

    setValue(
        level: number, metasubject: string, subject: string, exercise: string, 
        newProgress: ExerciseProgress
        ) {
            if (metasubject === "comunicare") {
                switch (level) {
                    case 1:
                        ProgressManager.level1.comunicare
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 2:
                        ProgressManager.level2.comunicare
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 3:
                        ProgressManager.level3.comunicare
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    default:
                        break;
                }
            } else if (metasubject === "matematica") {
                switch (level) {
                    case 1:
                        ProgressManager.level1.matematica
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 2:
                        ProgressManager.level2.matematica
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    case 3:
                        ProgressManager.level3.matematica
                        .parts.get(subject)?.parts.set(exercise, newProgress);
                        break;
                    default:
                        break;
                }
            }
        }

        static create() {
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
            this.level1.matematica.parts.get('aritmetica')?.parts
                .set('comparatii', new ExerciseProgress(0, 50));

            this.level1.matematica.parts.set('geometrie', new CollectionProgress());
            this.level1.matematica.parts.get('geometrie')?.parts 
                .set('culori', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('geometrie')?.parts 
                .set('regula_sirului', new ExerciseProgress(0, 50));
            this.level1.matematica.parts.get('geometrie')?.parts 
                .set('comparare', new ExerciseProgress(0, 50));

            this.scriere();
        }

        static initialize() {
            let directoryPath = join(homedir(), 'lima');
            let filePath = join(homedir(), 'lima', 'progress.json');

            console.log(`directoryPath: ${directoryPath}`);
            console.log(`filePath: ${filePath}`);

            if (!existsSync(join(homedir(), 'lima'))) {
                mkdirSync(join(homedir(), 'lima'));                
                writeFileSync(join(homedir(), 'lima'), '', {flag: 'w'});
                return; 
            }
            if (existsSync(join(homedir(), 'lima', 'progress.json')) === false) {
                // console.log(`'${join(homedir(), 'lima', 'progress.json')}'does not already exist`);
                writeFileSync(join(homedir(), 'lima', 'progress.json'), '', {flag: 'w'});
                return;
            }
            
            if (readFileSync(join(homedir(), 'lima', 'progress.json'), {
                encoding: 'utf-8', flag: 'r'}
            ).length === 0) {
                this.create();
                return;
            }

            console.log('Loading Progress Storage');


            let progressFile = readFileSync(join(homedir(), 'lima', 'progress.json'), {
                encoding: 'utf-8', flag: 'r'
            });
            let progressJson = JSON.parse(progressFile);

            progressJson.levels.forEach((element: any) => {
                var x = new LevelProgress();
                x.comunicare.parts.set('romana', new CollectionProgress());
                x.comunicare.parts.set('aritmetica', new CollectionProgress());
                x.comunicare.parts.set('geometrie', new CollectionProgress());

                if (element.comunicare.romana.litere[0] != 0 ||
                    element.comunicare.romana.vocale[0] != 0 ||
                    element.matematica.aritmetica.operatii[0] != 0 ||
                    element.matematica.aritmetica.fractii[0]  != 0 ||
                    element.matematica.aritmetica.ordine[0]   != 0 ||
                    element.matematica.aritmetica.formare[0]  != 0 ||
                    element.matematica.aritmetica.comparatii[0] != 0 ||
                    element.matematica.geometrie.culori[0]      != 0 ||
                    element.matematica.geometrie.regula_sirului[0]      != 0 ||
                    element.matematica.geometrie.comparare[0]           != 0) {
                        ProgressManager.isThereProgress = true;
                    }

                x.comunicare.parts.get('romana')?.parts.set('litere', 
                    new ExerciseProgress(element.comunicare.romana.litere[0],
                            element.comunicare.romana.litere[1]
                        )
                );
                x.comunicare.parts.get('romana')?.parts.set('vocale', 
                    new ExerciseProgress(element.comunicare.romana.vocale[0],
                            element.comunicare.romana.vocale[1]
                        )
                );
                x.matematica.parts.get('aritmetica')?.parts.set('operatii', 
                    new ExerciseProgress(element.matematica.aritmetica.operatii[0],
                            element.matematica.aritmetica.operatii[1]
                        )
                );
                x.matematica.parts.get('aritmetica')?.parts.set('fractii', 
                    new ExerciseProgress(element.matematica.aritmetica.fractii[0],
                            element.matematica.aritmetica.fractii[1]
                        )
                );
                x.matematica.parts.get('aritmetica')?.parts.set('ordine', 
                    new ExerciseProgress(element.matematica.aritmetica.ordine[0],
                            element.matematica.aritmetica.ordine[1]
                        )
                );
                x.matematica.parts.get('aritmetica')?.parts.set('formare', 
                    new ExerciseProgress(element.matematica.aritmetica.formare[0],
                            element.matematica.aritmetica.formare[1]
                        )
                );
                x.matematica.parts.get('aritmetica')?.parts.set('comparatii', 
                    new ExerciseProgress(element.matematica.aritmetica.comparatii[0],
                            element.matematica.aritmetica.comparatii[1]
                        )
                );
                x.matematica.parts.get('geometrie')?.parts.set('culori', 
                    new ExerciseProgress(element.matematica.geometrie.culori[0],
                        element.matematica.geometrie.culori[1]
                    )
                );
                x.matematica.parts.get('geometrie')?.parts.set('regula_sirului', 
                    new ExerciseProgress(element.matematica.geometrie.regula_sirului[0],
                        element.matematica.geometrie.regula_sirului[1]
                    )
                );
                x.matematica.parts.get('geometrie')?.parts.set('comparare', 
                    new ExerciseProgress(element.matematica.geometrie.comparare[0],
                        element.matematica.geometrie.comparare[1]
                    )
                );

                this.level1 = x;
            });

            console.log(progressJson);
        }

        static stergere() {
            this.isThereProgress = false;

            var romana1 = this.level1.comunicare.parts.get('romana');
            var aritmetica1 = this.level1.matematica.parts.get('aritmetica');
            var geometrie1 = this.level1.matematica.parts.get('geometrie');

            romana1?.parts.set('litere',
                new ExerciseProgress(0, romana1?.parts.get('litere')?.total ?? 0) 
            );
            romana1?.parts.set('vocale',
                new ExerciseProgress(0, romana1?.parts.get('litere')?.total ?? 0) 
            );
            aritmetica1?.parts.set('operatii',
                new ExerciseProgress(0, aritmetica1?.parts.get('operatii')?.total ?? 0) 
            );
            aritmetica1?.parts.set('fractii',
                new ExerciseProgress(0, aritmetica1?.parts.get('fractii')?.total ?? 0) 
            );
            aritmetica1?.parts.set('ordine',
                new ExerciseProgress(0, aritmetica1?.parts.get('ordine')?.total ?? 0) 
            );
            aritmetica1?.parts.set('formare',
                new ExerciseProgress(0, aritmetica1?.parts.get('formare')?.total ?? 0) 
            );
            aritmetica1?.parts.set('comparatii',
                new ExerciseProgress(0, aritmetica1?.parts.get('comparatii')?.total ?? 0) 
            );
            geometrie1?.parts.set('culori', 
                new ExerciseProgress(0, geometrie1?.parts.get('culori')?.total ?? 0) 
            );
            geometrie1?.parts.set('regula_sirului', 
                new ExerciseProgress(0, geometrie1?.parts.get('regula_sirului')?.total ?? 0) 
            );
            geometrie1?.parts.set('comparare', 
                new ExerciseProgress(0, geometrie1?.parts.get('comparare')?.total ?? 0) 
            );

            let progressMap = {
                levels: [
                    {
                        "comunicare": {
                            "romana": {
                                "litere": [0, romana1?.parts.get('litere')!.total],
                                "vocale": [0, romana1?.parts.get('vocale')!.total],
                            },
                        },
                        "matematica": {
                            "aritmetica": {
                                "operatii": [0, aritmetica1?.parts.get('operatii')!.total],
                                "fractii": [0, aritmetica1?.parts.get('fractii')!.total],
                                "ordine": [0, aritmetica1?.parts.get('ordine')!.total],
                                "formare": [0, aritmetica1?.parts.get('formare')!.total],
                                "comparatii": [0, aritmetica1?.parts.get('comparatii')!.total],
                            },
                            "geometrie": {
                                "culori": [0, geometrie1?.parts.get('culori')?.total],
                                "regula_sirului": [0, geometrie1?.parts.get('regula_sirului')?.total],
                                "comparare": [0, geometrie1?.parts.get('comparare')?.total],
                            }
                        }
                    }
                ]
            }

            writeFileSync(join(homedir(), 'lima', 'progress.json'), JSON.stringify(progressMap), {
                encoding: 'utf-8', flag: 'w'
            });
        }

        static scriere() {
            var romana1 = this.level1.comunicare.parts.get('romana');
            var aritmetica1 = this.level1.matematica.parts.get('aritmetica');
            var geometrie1 = this.level1.matematica.parts.get('geometrie');

            romana1?.parts.set('litere',
                new ExerciseProgress(0, romana1?.parts.get('litere')?.total ?? 0) 
            );
            romana1?.parts.set('vocale',
                new ExerciseProgress(0, romana1?.parts.get('litere')?.total ?? 0) 
            );
            aritmetica1?.parts.set('operatii',
                new ExerciseProgress(0, aritmetica1?.parts.get('operatii')?.total ?? 0) 
            );
            aritmetica1?.parts.set('fractii',
                new ExerciseProgress(0, aritmetica1?.parts.get('fractii')?.total ?? 0) 
            );
            aritmetica1?.parts.set('ordine',
                new ExerciseProgress(0, aritmetica1?.parts.get('ordine')?.total ?? 0) 
            );
            aritmetica1?.parts.set('formare',
                new ExerciseProgress(0, aritmetica1?.parts.get('formare')?.total ?? 0) 
            );
            aritmetica1?.parts.set('comparatii',
                new ExerciseProgress(0, aritmetica1?.parts.get('comparatii')?.total ?? 0) 
            );
            geometrie1?.parts.set('culori', 
                new ExerciseProgress(0, geometrie1?.parts.get('culori')?.total ?? 0) 
            );
            geometrie1?.parts.set('regula_sirului', 
                new ExerciseProgress(0, geometrie1?.parts.get('regula_sirului')?.total ?? 0) 
            );
            geometrie1?.parts.set('comparare', 
                new ExerciseProgress(0, geometrie1?.parts.get('comparare')?.total ?? 0) 
            );


            let progressMap = {
                levels: [
                    {
                        "comunicare": {
                            "romana": {
                                "litere": [romana1?.parts.get('litere')?.current, romana1?.parts.get('litere')!.total],
                                "vocale": [romana1?.parts.get('vocale')!.current, romana1?.parts.get('vocale')!.total],
                            },
                        },
                        "matematica": {
                            "aritmetica": {
                                "operatii": [aritmetica1?.parts.get('operatii')?.current, aritmetica1?.parts.get('operatii')!.total],
                                "fractii": [aritmetica1?.parts.get('fractii')?.current, aritmetica1?.parts.get('fractii')!.total],
                                "ordine": [aritmetica1?.parts.get('ordine')?.current, aritmetica1?.parts.get('ordine')!.total],
                                "formare": [aritmetica1?.parts.get('formare')?.current, aritmetica1?.parts.get('formare')!.total],
                                "comparatii": [aritmetica1?.parts.get('comparatii')?.current, aritmetica1?.parts.get('comparatii')!.total],
                            },
                            "geometrie": {
                                "culori": [geometrie1?.parts.get('culori')?.current, geometrie1?.parts.get('culori')?.total],
                                "regula_sirului": [geometrie1?.parts.get('regula_sirului')?.current, geometrie1?.parts.get('regula_sirului')?.total],
                                "comparare": [geometrie1?.parts.get('comparare')?.current, geometrie1?.parts.get('comparare')?.total],
                            }
                        }
                    }
                ]
            }

            writeFileSync(join(homedir(), 'lima', 'progress.json'), JSON.stringify(progressMap), {
                encoding: 'utf-8', flag: 'w'
            });

        }

        constructor() {
            ProgressManager.initialize();
        }
};