import {Button, Tooltip} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {StorageContainer, useStorageContext} from "@/services/context";

type Answer = {
    correct: string;
    wrong: Array<string>;
}

function ChooseAnswer({paragraph, index}: {paragraph: Paragraph, index: number}) {
    const storage = useStorageContext();
    let answers = new Array<string>();
    let [paragraph_cpy, setParagraph_cpy] = useState(paragraph);

    // useEffect(() => {
        paragraph_cpy.answers[index].wrong.forEach((val) => {
            answers.push(val);
        })
        answers.push(paragraph_cpy.answers[index].correct);
    // }, []);


    return (
        <Tooltip content={
            <Button.Group>
                {answers.map((val) => {
                    return <Button onPress={() => {
                        paragraph_cpy.choices[index] = val;
                        let new_paragraph: Paragraph = {...paragraph_cpy} as Paragraph;
                        new_paragraph.choices[index] = val;
                        setParagraph_cpy(new_paragraph);
                        paragraph.choices[index] = val;
                    }}
                        flat={!(val === paragraph_cpy.choices[index])}
                    >{val}</Button>
                }
                )}
            </Button.Group>
        } style={{display: "inline"}}
            trigger="click"
        >
            <div className="choose-answer">
            <span style={{
                color: "#0072f5", fontFamily: "DM Sans"
            }}>{paragraph_cpy.choices[index] ?? ""}</span>
            </div>
        </Tooltip>)
}

export class Paragraph {
    content: string = "";
    author: string = "";
    title: string = "";
    answers: Array<Answer> = new Array<Answer>();
    choices: Array<string | null> = new Array<string | null>(null);

    constructor(content: string, author: string, title: string, answer: Answer[]) {
        this.content = content, this.author = author, this.title = title, this.answers = answer
    }

    getJSX(): JSX.Element {
        let ans_count = this.answers.length;

        let marked_content: string = this.content;

        for (let i = 1; i <= ans_count; i++) {
           marked_content = marked_content.replace(`\{${i}\}`, "*");
        }

        let paragraphs = marked_content.split("\n");
        let segments = marked_content.split("*");
        let components: Array<JSX.Element> = new Array<JSX.Element>();

        let ans_index = 0;

        paragraphs.forEach((value_paragraph, index, array) => {
            components.push(<p style={{textAlign: 'justify', fontFamily: 'DM Sans', marginBottom: '10px', textIndent: "50px"}}>
                {value_paragraph.split("*").map((value, index, array) => {
                    if (value === array[array.length-1]) {
                       return <>{value}</>
                    }
                    ans_index++;
                    console.log(ans_index);
                    return <>{value}<ChooseAnswer index={ans_index-1} paragraph={this} /></>
                })}
            </p>)
        })

        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {components.map((component) => (
                    component
                ))}
            </div>
        )
    }
}
