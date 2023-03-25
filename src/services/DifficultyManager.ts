import { Operator } from '@/types/ExpressionTree';

export enum Order {
    ascending, 
    descending
}

export enum FormareType {
    U,
    ZU,
    SZU,
    MSZU
}

class Difficulty {}

export class ExpressionDifficulty extends Difficulty {
    lowLimit: number = 0;
    maxLimit: number = 10;
    depth: number = 2;
    allowedOperators: Array<Operator> = [Operator.minus, Operator.plus];
}

class FractionDifficulty extends Difficulty {
    lowLimit: number = 0;
    maxLimit: number = 10;
    allowWholes: boolean = false;
}

export class OrderDifficulty extends Difficulty {
    lowLimit: number = 0;
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
}