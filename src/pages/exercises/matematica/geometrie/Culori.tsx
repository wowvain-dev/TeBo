import './Culori.sass';
import stick_llama from '../../.././../assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '@/components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import {useEffect, useRef, useState} from "react";
import {
    useProgressContext,
    useDifficultyContext,
    useStorageContext,
    useSettingsContext, useDiplomaContext
} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, GoAlert, HiOutlineSpeakerphone, HiOutlineSpeakerWave} from "react-icons/all";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';
import random from 'random';
import React from 'react';
import {shuffle} from "@/utils/ShuffleArray";

enum Colors {
    red = '#e51126',
    blue = '#0072f5',
    green = '#17c964',
    yellow = '#fff566',
    purple = '#681fc0',
    pink = '#ff69c9',
    gray = '#706e6e'
};

const SVG_HEIGHT = 160;
const SVG_WIDTH = 300;

export function Culori() {
    const diploma = useDiplomaContext();
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const storage = useStorageContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [tourVisible, setTourVisible] = useState(false);
    const [chosenColor, setChosenColor] = useState<Colors | null>(null);
    const [answerColor, setAnswerColor] = useState<Colors | null>(null);
    const [chosenShape, setChosenShape] = useState<"triangle" | "square" | "circle">("circle");

    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);
    const [letterSound, setLetterSound] = useState(false);

    let shapeRef = useRef(null);
    let choiceRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);


    const getRandomColor = () => {
        let x = random.int(0, 7);
        switch (x) {
            case 0:
                return Colors.blue;
            case 1:
                return Colors.gray;
            case 2:
                return Colors.green;
            case 3:
                return Colors.pink;
            case 4:
                return Colors.purple;
            case 5:
                return Colors.red;
            case 6:
                return Colors.yellow;
            default:
                break;
        }
        return Colors.blue;
    }

    const getRandomShape = () => {
        let a = random.int(0, 2);
        console.log("a: ", a);
        switch (a) {
            case 0:
                return "square";
            case 1:
                return "triangle";
            case 2:
                return "circle";
            default:
                return "circle";
        }
    }

    useEffect(() => {
        setVerifColor('primary');
        setChosenColor(getRandomColor());
        setHasCheated(false);
        setChosenShape(getRandomShape());
    }, []);


    const settings = useSettingsContext();
    const avatar = settings.value.settings.avatar;
    const AlbastruButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
            <Button
                size='sm'
                flat={!(answerColor === Colors.blue)}
                onPress={() => {
                    if (answerColor === Colors.blue) {
                        setAnswerColor(null);
                        return;
                    }
                    setAnswerColor(Colors.blue);
                    return;
                }}
            >Albastru</Button>
        </div>);
    }
    const GriButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
            <Button
                size='sm'
                flat={!(answerColor === Colors.gray)}
                css={
                    answerColor !== Colors.gray ? {} : {
                        bg: "#706e6e",
                        color: "#fff"
                    }
                }
                onPress={() => {
                    if (answerColor === Colors.gray) {
                        setAnswerColor(null);
                        return;
                    }
                    setAnswerColor(Colors.gray);
                    return;
                }}
            >Gri</Button>
        </div>)
    }
    const VerdeButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
            <Button
                size='sm'
                flat={!(answerColor === Colors.green)}
                color={answerColor === Colors.green ? 'success' : 'primary'}
                onPress={() => {
                    if (answerColor === Colors.green) {
                        setAnswerColor(null);
                        return;
                    }
                    setAnswerColor(Colors.green);
                    return;
                }}
            >Verde</Button>
        </div>)
    }
    const RozButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
                <Button
                    size='sm'
                    flat={!(answerColor === Colors.pink)}
                    css={
                        answerColor !== Colors.pink ? {} : {
                            bg: "#ff69c9",
                            color: "#fff"
                        }
                    }
                    onPress={() => {
                        if (answerColor === Colors.pink) {
                            setAnswerColor(null);
                            return;
                        }
                        setAnswerColor(Colors.pink);
                        return;
                    }}
                >Roz</Button>
            </div>
        )
    }
    const PurpleButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
            <Button
                size='sm'
                flat={!(answerColor === Colors.purple)}
                css={
                    answerColor !== Colors.purple ? {} : {
                        bg: "#681fc0",
                        color: "#fff"
                    }
                }
                onPress={() => {
                    if (answerColor === Colors.purple) {
                        setAnswerColor(null);
                        return;
                    }
                    setAnswerColor(Colors.purple);
                    return;
                }}
            >Mov</Button>
        </div>);
    }
    const RosuButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
            <Button
                size='sm'
                flat={!(answerColor === Colors.red)}
                css={
                    answerColor !== Colors.red ? {} : {
                        bg: "#e51126",
                        color: "#fff"
                    }
                }
                onPress={() => {
                    if (answerColor === Colors.red) {
                        setAnswerColor(null);
                        return;
                    }
                    setAnswerColor(Colors.red);
                    return;
                }}
            >Roşu</Button>
        </div>);
    }
    const GalbenButton = (
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => {
        return (<div>
            <Button
                size='sm'
                flat={!(answerColor === Colors.yellow)}
                css={
                    answerColor !== Colors.yellow ? {} : {
                        bg: "#fff566",
                        color: "#000"
                    }
                }
                onPress={() => {
                    if (answerColor === Colors.yellow) {
                        setAnswerColor(null);
                        return;
                    }
                    setAnswerColor(Colors.yellow);
                    return;
                }}
            >Galben</Button>
        </div>)
    }
    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Priviţi cu atenţie forma
                </div>
            ),
            description: (<div style={{display: 'flex'}}>
                <div style={{flex: '1'}}>
                    Observați culoarea formei.
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={avatar.getStick()} alt='Llama ajutatoare'/>
            </div>),
            target: () => shapeRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Alegeți răspunsul corect
                </div>
            ),
            description: (<div style={{display: 'flex'}}>
                <div style={{flex: '1'}}>
                    Priviți lista de culori și alegeți culoarea pe care o vedeți în forma de mai sus.
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={avatar.getStick()} alt='Llama ajutatoare'/>
            </div>),
            target: () => choiceRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }

        },
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Treceţi peste acest exerciţiu
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                    </div>
                </div>
            ),
            description: (
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1', color: '#F5A524'}}>
                        Nu vei primi puncte de progres pentru acest exercțiu
                    </div>
                    <Divider type={"vertical"} style={{height: '100px'}}/>
                    <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                         src={avatar.getStick()} alt='Llama ajutatoare'/>
                </div>),
            target: () => skipRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Afișaţi răspunsul corect al exerciţiului
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                    </div>
                </div>
            ),
            description: (
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1', color: '#F5A524'}}>
                        Nu vei primi puncte de progres dacă arăți răspunsul corect.
                    </div>
                    <Divider type={"vertical"} style={{height: '100px'}}/>
                    <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                         src={avatar.getStick()} alt='Llama ajutatoare'/>
                </div>),
            target: () => cheatRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Verifică
                </div>
            ),
            description: (<div style={{display: 'flex'}}>
                <div style={{flex: '1'}}>
                    După ce introduci răspunsul, apasă pe butonul de verificare pentru a vedea cum te-ai descurcat!
                    Dacă ai greșit, nu te descuraja, poți să mai încerci odată!
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={avatar.getStick()} alt='Llama ajutatoare'/>
            </div>),
            target: () => ansRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        }

    ];

    // @ts-ignore
    const [buttons, setButtons]
        = useState<Array<(
        {answerColor, setAnswerColor}: {
            answerColor: Colors | null,
            setAnswerColor: (val: Colors | null) => void
        }
    ) => JSX.Element>>([
        AlbastruButton, GriButton, VerdeButton, RozButton, PurpleButton, RosuButton, GalbenButton
    ]);

    const renderShape = ({size, shape}: {
        size: number, shape: "triangle" | "circle" | "square"
    }) => {
        let shapeElement = <></>;
        if (shape === "circle") {
            shapeElement = (
                <circle cx={SVG_WIDTH / 2} cy={SVG_HEIGHT / 2}
                        r={size / 2} fill={chosenColor ?? '#000'}
                />
            )
        } else if (shape === "square") {
            shapeElement = (
                <rect x={SVG_WIDTH / 2 - size / 2} y={SVG_HEIGHT / 2 - size / 2}
                      width={size} height={size}
                      fill={chosenColor ?? "#000"}/>
            );
        } else if (shape === "triangle") {
            let triangleHeight = (size * Math.sqrt(3)) / 2;
            shapeElement = (
                <polygon
                    points={`${SVG_WIDTH / 2 - (size / 2)},${SVG_HEIGHT / 2 + triangleHeight / 3} ${SVG_WIDTH / 2},${SVG_HEIGHT / 2 - 2 * triangleHeight / 3} ${SVG_WIDTH / 2 + (size) / 2},${SVG_HEIGHT / 2 + triangleHeight / 3}`}
                    fill={chosenColor ?? "#000"}
                />
            );
        }

        return shapeElement;
    }

    useEffect(() => setButtons(shuffle(buttons)), []);

    const MainContent = () => {

        return (
            <div className="culori-card-holder">
                <Card css={{width: '70%', height: '360px'}}>
                    <Card.Header css={{fontFamily: 'DM Sans', borderBottom: '1px solid #ccc'}}>
                        Alegeţi opţiunea corectă
                    </Card.Header>
                    <Card.Body css={{
                        fontFamily: 'DM Sans',
                        justifyContent: 'center',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyCenter: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <svg width={SVG_WIDTH} height={SVG_HEIGHT} ref={shapeRef}>
                                {renderShape({
                                    size: 80, shape: chosenShape
                                })}
                            </svg>
                        </div>
                        <Divider type='horizontal' style={{width: '100px', marginTop: '0'}}/>
                        <div ref={choiceRef}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {buttons[0]({answerColor, setAnswerColor})}
                                <Spacer x={1}/>
                                {buttons[1]({answerColor, setAnswerColor})}
                                <Spacer x={1}/>
                                {buttons[2]({answerColor, setAnswerColor})}
                                <Spacer x={1}/>
                                {buttons[3]({answerColor, setAnswerColor})}
                            </div>
                            <Spacer y={1}/>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {buttons[4]({answerColor, setAnswerColor})}
                                <Spacer x={1}/>
                                {buttons[5]({answerColor, setAnswerColor})}
                                <Spacer x={1}/>
                                {buttons[6]({answerColor, setAnswerColor})}
                            </div>

                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    return (
        <AnimatedPage>
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
            <div className="card-holder culori">
                <Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps}/>
                <TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible}/>
                <div className="background-card">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button light auto size='xs' icon={<ArrowLeft size="24"/>}
                                css={{width: "36px", height: "36px"}}
                                onPress={() => navigate(-1)}
                        />
                        <Button light auto size='xs' icon={<AiOutlineQuestion size="24"/>}
                                css={{width: "36px", height: "36px"}}
                                onPress={() => {
                                    setTourVisible(true)
                                }}
                        />
                    </div>
                    <h3 style={{textAlign: 'center', fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: '20px'}}>
                        Recunoaşterea Culorilor
                    </h3>

                    {swap && <AnimatedPage><MainContent/></AnimatedPage>}
                    {!swap && <AnimatedPage><MainContent/></AnimatedPage>}

                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef} css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    setHasCheated(false);
                                    setSwap(!swap);
                                    setChosenColor(getRandomColor());
                                    setAnswerColor(null);
                                    setChosenShape(getRandomShape());
                                    setButtons(shuffle(buttons));
                                }}
                        >
                            Treci Peste
                        </Button>
                        <Spacer x={2}/>
                        <Tooltip contentColor='warning' placement='top' shadow content={
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Warning2 color='#f5a524'/>
                                <Spacer x={1}/>
                                <span>Nu vei mai primi puncte de progres pentru acest exercitiu.</span>
                            </div>
                        }>
                            <Button size='lg' color='warning' flat ref={cheatRef} css={{fontFamily: 'DM Sans'}}
                                    onPress={() => {
                                        setHasCheated(true);
                                        setAnswerColor(chosenColor);
                                    }}
                            >
                                Arată Răspunsul
                            </Button>
                        </Tooltip>
                        <Spacer x={2}/>
                        {/*@ts-ignore*/}
                        <Button size='lg' ref={ansRef} css={{fontFamily: 'DM Sans'}} color={verifColor}
                                onPress={() => {
                                    if (chosenColor === answerColor) {
                                        setVerifColor('success');
                                        setTimeout(() => {
                                            setVerifColor('primary');
                                        }, 500);
                                        setAnswerColor(null);
                                        setChosenColor(getRandomColor());
                                        setChosenShape(getRandomShape());
                                        setButtons(shuffle(buttons));
                                        setSwap(!swap);
                                        setSuccessSound(true);
                                        if (hasCheated) {
                                            setHasCheated(false);
                                        } else {
                                            let copy = {...progress.value};
                                            let newProgress: ExerciseProgress =
                                                copy.level1.matematica.parts.get('geometrie')
                                                    ?.parts.get('culori') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                            // @ts-ignore
                                            newProgress.current += 1;

                                            copy.level1.matematica.parts.get('geometrie')
                                                ?.parts.set('culori', newProgress);

                                            let newManager: ProgressManager = new ProgressManager();
                                            newManager.level1 = copy.level1;
                                            newManager.level2 = copy.level2;
                                            newManager.level3 = copy.level3;
                                            progress.setValue(newManager);
                                            progress.value.scriere();

                                            let culori_progress = progress.value.getField("matematica", "geometrie", "culori");
                                            let comparare_progress = progress.value.getField("matematica", "geometrie", "comparare");

                                            if (culori_progress.current === culori_progress.total) {
                                                if (comparare_progress.current >= culori_progress.total) {
                                                    diploma.value.setOpenGeometrie(true);
                                                }
                                            }
                                        }
                                    } else {
                                        setFailureSound(true);
                                        setTryAgainVisible(true);
                                        setTimeout(() => {
                                            setTryAgainVisible(false);
                                        }, 1500);
                                        setVerifColor('error');
                                        setTimeout(() => {
                                            setVerifColor('primary');
                                        }, 500);
                                    }
                                }}
                        >Verifică</Button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}