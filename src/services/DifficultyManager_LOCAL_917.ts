import {Operator} from '@/types/ExpressionTree';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";
import {homedir} from "os";

export enum Order {
    ascending = 'crescător',
    descending = 'descrescător'
}

export enum FormareType {
    U,
    ZU,
    SZU,
    MSZU
}

class Difficulty {
}

export class ExpressionDifficulty extends Difficulty {
    lowLimit: number = 1;
    maxLimit: number = 10;
    depth: number = 2;
    allowedOperators: Array<Operator> = [Operator.minus, Operator.plus];
}

export class FractionDifficulty extends Difficulty {
    lowLimit: number = 2;
    maxLimit: number = 10;
    allowWholes: boolean = false;
}

export class OrderDifficulty extends Difficulty {
    lowLimit: number = 1;
    maxLimit: number = 10;
    length: number = 7;
    allowedOrders: Array<Order> = [Order.descending, Order.ascending];
}

export class FormareDifficulty extends Difficulty {
    formationType: FormareType = FormareType.ZU;
}

export class DifficultyManager {
    operatii: ExpressionDifficulty = new ExpressionDifficulty();
    fractii: FractionDifficulty = new FractionDifficulty();
    ordine: OrderDifficulty = new OrderDifficulty();
    formare: FormareDifficulty = new FormareDifficulty();

    create() {
        this.operatii = new ExpressionDifficulty();
        this.fractii = new FractionDifficulty();
        this.ordine = new OrderDifficulty();
        this.formare = new FormareDifficulty();

        this.write();
    }

    write() {
        writeFileSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'), JSON.stringify(this), {
            encoding: 'utf-8', flag: 'w'
        });
    }

    initialize() {
        let directoryPath = join(homedir(), 'TeBo', 'storage');
        let filePath = join(homedir(), 'TeBo', 'storage', 'difficulty.json');

        if (!existsSync(join(homedir(), 'TeBo'))) {
            mkdirSync(join(homedir(), 'TeBo'));
            mkdirSync(join(homedir(), 'TeBo', 'storage'));
            writeFileSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'), '', {flag: 'w'});
            return;
        }

        if (!existsSync(join(homedir(), 'TeBo', 'storage'))) {
            mkdirSync(join(homedir(), 'TeBo', 'storage'));
            writeFileSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'), '', {flag: 'w'});
            return;
        }

        if (!existsSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'))) {
            writeFileSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'), '', {flag: 'w'});
            return
        }

        if (readFileSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'), {
            encoding: 'utf-8', flag: 'r'
        }).length === 0) {
            this.create();
            return;
        }

        console.log('Loading previous difficulties');

        let settingsFile = readFileSync(join(homedir(), 'TeBo', 'storage', 'difficulty.json'), {
            encoding: 'utf-8', flag: 'r'
        });

        let settingsJson = JSON.parse(settingsFile);

        this.operatii = settingsJson.operatii;
        this.formare = settingsJson.formare;
        this.fractii = settingsJson.fractii;
        this.ordine = settingsJson.ordine;
    }

    stergere() {
        this.create();
        this.write();
    }

    constructor() {
        this.initialize();
    }
}