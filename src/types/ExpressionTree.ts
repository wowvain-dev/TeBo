import {ipcMain} from 'electron';
import {Queue} from './Queue';
import random from "random";

export enum Operator {
    plus = '+',
    minus = '-',
    mul = '✕',
    div = ':'
}

export class ExpressionNode {
    sign: Operator | null = null;
    value: number | null = null;
    left: ExpressionNode | null = null;
    right: ExpressionNode | null = null;
    parent: ExpressionNode | null = null;


    constructor(sign: Operator | null, value: number | null) {
        this.sign = sign, this.value = value;
    }

    toString() {
        this._diagram(this);
    }

    isEqual(other: ExpressionNode) {
        return this.value == other.value && this.sign == other.sign;
    }

    _diagram(
        node: ExpressionNode | null,
        top: string = '',
        root: string = '',
        bottom: string = ''
    ): string {
        if (node === null) return `${root} null\n`;
        if (node.left == null && node.right == null) return `${root} ${node.value ?? node.sign}\n`;

        let a = this._diagram(
            node.right === undefined ? null : node.right,
            `${top} `,
            `${top}┌──`,
            `${top}│ `,
        );
        let b = `${root}${node.value ?? node.sign}\n`;
        let c = this._diagram(
            node.left === undefined ? null : node.left,
            `${bottom}│ `,
            `${bottom}└──`,
            `${bottom} `,
        );

        return `\n${a}${b}${c}`;
    }

    height(): number {
        let left: number, right: number;
        if (this.left === undefined || this.left === null) {
            left = 0;
        } else {
            left = this.left.height();
        }
        if (this.right === undefined || this.right === null) {
            right = 0;
        } else {
            right = this.right.height();
        }

        return (left < right ? right : left) + 1;
    }

    infix(): string {
        if (this.sign === null && this.value === null) {
            return '';
        }

        let a: string = '';

        if (this.isOperator()) {
            if (this.height() > 3) {
                a = `{${this.left?.infix()}${this.sign}${this.right?.infix()}}`;
            } else if (this.height() === 3) {
                a = `[${this.left?.infix()}${this.sign}${this.right?.infix()}]`;
            } else if (this.height() === 2) {
                a = `(${this.left?.infix()}${this.sign}${this.right?.infix()})`;
            }
        } else {
            a = `${this.value}${a}`;
        }

        return a;
    }

    isOperator(): boolean {
        if ((this.sign !== null || this.sign !== undefined) &&
            (this.value === null || this.value === undefined)
        ) return true;

        if ((this.sign === null || this.sign === undefined) &&
            (this.value !== null || this.value !== undefined)
        ) return false;

        if ((this.sign === null || this.sign === undefined) &&
            (this.value === null || this.value === undefined)
        ) return false;

        if ((this.sign !== null || this.sign !== undefined) &&
            (this.value !== null || this.value !== undefined)
        ) throw new Error("A node can't have both a sign and a value");

        return false;
    }
}

export class ExpressionTree {
    root: ExpressionNode | null = null;
    allowedOperators: Array<Operator> = new Array;
    minimumAllowedOperand: number = 0;
    maximumAllowedOperand: number = 0;
    maximumPossibleDepth: number = 0;

    public get depth(): number {
        return this.getDepth(this.root);
    }

    public static random(
        // allowed operators
        operators: Array<Operator>,
        // the start of the interval allowed for the numbers
        start: number,
        // the end of the interval allowed for the numbers
        end: number,
        // has the max depth been reached
        maxDepth: number
    ): ExpressionTree {
        console.log(`expressionTree.random: ` + maxDepth);
        const cls = new ExpressionTree();
        cls.allowedOperators = operators;
        cls.minimumAllowedOperand = start;
        cls.maximumAllowedOperand = end;
        cls.maximumPossibleDepth = maxDepth;
        cls.root = cls.randomExpression(
            operators, start, end, maxDepth
        );
        return cls;
    }

    public static randomUsingSource(source: ExpressionTree) {
        const cls = new ExpressionTree();
        cls.allowedOperators = source.allowedOperators;
        cls.minimumAllowedOperand = source.minimumAllowedOperand;
        cls.maximumAllowedOperand = source.maximumAllowedOperand;
        cls.maximumPossibleDepth = source.maximumPossibleDepth;
        cls.root = cls.randomExpression(
            cls.allowedOperators, cls.minimumAllowedOperand, cls.maximumAllowedOperand, cls.maximumPossibleDepth
        );
    }

    static _buildInOrderQueue(
        queue: Queue<ExpressionNode | null>,
        n: ExpressionNode | null
    ): void {
        if (n === null) return;

        this._buildInOrderQueue(queue, n.left);
        queue.enqueue(n);
        this._buildInOrderQueue(queue, n.right);
    }

    /// Returns the first (inorder) operator node that doesn't have both operands.
    static getFirstFreeOperatorLeafNode(n: ExpressionNode | null) {
        let queue: Queue<ExpressionNode | null> = new Queue();

        this._buildInOrderQueue(queue, n);

        while (queue.size() !== 0) {
            if (queue.first()?.isOperator()
                && (queue.first()?.left === null || queue.first()?.right === null)) {
                return queue.first();
            }
            queue.dequeue();
        }

        return null;
    }

    /// Adds a new leaf node to the tree (to the first "free" operator node).
    addLeafNode(node: ExpressionNode | null) {
        if (node === null) return;
        if (this.root === null) {
            this.root = node;
            this.root.parent = null;
            this.root.left = null;
            this.root.right = null;
        } else {
            let lastOperatorLeaf: ExpressionNode | null =
                ExpressionTree.getFirstFreeOperatorLeafNode(this.root);

            if (lastOperatorLeaf !== null) {
                if (lastOperatorLeaf.left === null) {
                    node.parent = lastOperatorLeaf;
                    lastOperatorLeaf.left = node;
                } else {
                    if (lastOperatorLeaf.right === null) {
                        node.parent = lastOperatorLeaf;
                        lastOperatorLeaf.right = node;
                    }
                }
            }
        }
    }

    /// Returns the depth of the binary tree.
    getDepth(node: ExpressionNode | null): number {
        if (node === null) {
            return 0;
        } else {
            let lDepth: number = this.getDepth(node.left);
            let rDepth: number = this.getDepth(node.right);

            return (lDepth > rDepth ? lDepth : rDepth) + 1;
        }
    }

    /// Returns an `ExpressionNode` that eithers contains a sign node or a 
    /// value node with its value found in a set numerical interval
    static randomOperandOrOperator(
        // allowed operators
        operators: Array<Operator>,
        // the start of the interval allowed for the numbers
        start: number,
        // the end of the interval allowed for the numbers
        end: number,
        // is the max depth reached?
        maxDepth: boolean
    ): ExpressionNode {
        if (operators.length === 1) {
            maxDepth = true;
        }

        // console.log(`start: ${start}; end: ${end}`);
        if (maxDepth) {
            return new ExpressionNode(null, Math.floor(Math.random() * (end - start) + start));
        } else {
            let percentage: number = Math.random() * 100 + 1;
            if (percentage <= 30) {
                return new ExpressionNode(null, Math.floor(Math.random() * (end - start) + start));
            } else {
                return new ExpressionNode(
                    operators[Math.floor(Math.random() * (operators.length))], null
                );
            }
        }
    }

    static evaluate(node: ExpressionNode | null): number {
        if (node === null) return 1;
        if (node.left === null && node.right === null) {
            return node.value ?? 0;
        }

        /// Evaluate the left subtree
        let lVal: number = this.evaluate(node.left);

        /// Evaluate the right subtree
        let rVal: number = this.evaluate(node.right);

        if (node.sign === Operator.plus) return lVal + rVal;
        if (node.sign === Operator.minus) return lVal - rVal;
        if (node.sign === Operator.mul) return lVal * rVal;
        if (node.sign === Operator.div) {
            if (rVal === 0) return 0;
            return ~~(lVal / rVal);
        }

        return 0;
    }

    /// Returns a tree containing a randomly generated expression based on
    /// the operators given as parameters, the interval of the numeric values
    /// and the maximum depth of the tree.
    randomExpression(
        /// allowed operators
        operators: Array<Operator>,
        /// the start of the interval allowed for the numbers
        start: number,
        /// the end of the interval allowed for the numbers
        end: number,
        /// the max depth
        maxDepth: number
    ): ExpressionNode | null {
        let expression: ExpressionTree = new ExpressionTree();
        do {
            let lastNode = ExpressionTree.getFirstFreeOperatorLeafNode(expression.root);
            if (lastNode === null) {
                expression.addLeafNode(new ExpressionNode(
                    operators[Math.floor(Math.random() * (operators.length))], null
                ));
                continue;
            }

            let op = ExpressionTree.randomOperandOrOperator(
                operators, start, end, expression.depth >= maxDepth);

            if (lastNode.left === null) {
                expression.addLeafNode(op);
                continue;
            }

            let val = ExpressionTree.evaluate(lastNode.left);

            if (lastNode.isEqual(new ExpressionNode(Operator.minus, null))) {
                if (val <= 1) {
                    lastNode.sign = Operator.plus;
                    lastNode.right = new ExpressionNode(null, random.int(this.minimumAllowedOperand, this.maximumAllowedOperand));
                    continue;
                }
                lastNode.right = new ExpressionNode(null, Math.floor(Math.random() * (val)));
                continue;
            }

            if (!lastNode.isEqual(new ExpressionNode(Operator.div, null))) {
                expression.addLeafNode(op);
                continue;
            }
            console.log('reached division');
            if (lastNode.left !== null) {
                console.log(ExpressionTree.evaluate(lastNode.left));
                if (val === 0) {
                    expression.addLeafNode(new ExpressionNode(null, 1));
                    continue;
                }

                let divisors: Array<number> = new Array();

                var i = 1;

                while (i * i <= val && i <= end) {
                    console.log(`i: ${i}; val: ${val}`);
                    if (Math.floor(val) % i === 0) {
                        if (i * i === val) {
                            divisors.push(i);
                            break;
                        }
                        console.log(`trying ${i} and ${val / i}`)
                        // divisors.push(...[i, Math.floor(Math.floor(val)/i)]);
                        divisors.push(i);
                        console.log(`pushed ${i}`);
                        divisors.push(Math.floor(Math.floor(val) / i));
                        console.log(`pushed ${Math.floor(Math.floor(val) / i)}`);
                        console.log(divisors);
                    }
                    i++;
                }
                var shuffle = divisors;
                while (shuffle[0] === 1 && shuffle.length > 1) {
                    shuffle = shuffle.map(val => ({val, sort: Math.random()}))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({val}) => val);
                }
                console.log('reached end');
                expression.addLeafNode(new ExpressionNode(null, shuffle[0]));
                divisors = [];
                continue;
            }
        } while (ExpressionTree.getFirstFreeOperatorLeafNode(expression.root) !== null);
        return expression.root;
    }

    public get expression(): string {
        if (this.root === null) {
            return "".toString();
        } else {
            var expr = this.root.infix();
            if (expr.includes('(')) {
                expr = expr.substring(1, expr.length - 1);
            }

            var chars = [...expr];
            var test = '';

            var res = '';

            for (let a = 0; a < chars.length; a++) {
                res = `${res}${chars[a]}`;
            }

            return res;
        }
    }

}