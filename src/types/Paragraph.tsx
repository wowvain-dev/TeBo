type Answer = {
    correct: string;
    wrong: Array<string>;
}

export class Paragraph {
    content: string = "";
    author: string = "";
    title: string = "";
    answers: Array<Answer> = new Array<Answer>();

    getJSX(): JSX.Element {
        return(
            <div>
             </div>
        )
    }
}
