import './Culori.sass';
import stick_llama from '../../.././../assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '@/components/AnimatedPage';
import { Button, Card, Input, NormalColors, Spacer, Modal, Tooltip } from '@nextui-org/react';
import { ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2 } from "iconsax-react";
import { useNavigate } from 'react-router-dom';
import { ExpressionTree } from '@/types/ExpressionTree';
import { useEffect, useRef, useState } from "react";
import { useProgressContext, useDifficultyContext, useStorageContext } from '../../../../services/context';
import { ExerciseProgress, ProgressManager } from '@/services/ProgressManager';
import { Divider, notification, Tour, TourProps } from "antd";
import { TryAgainModal } from "@/components/TryAgainModal";
import { AiOutlineQuestion, HiOutlineSpeakerphone, HiOutlineSpeakerWave } from "react-icons/all";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';
import random from 'random';
import React from 'react';

export enum Colors {
    red = '#ff7875',
    blue = '#4096ff',
    green = '#73d13d',
    yellow = '#fff566',
    purple = '#b37feb',
    pink = '#f759ab',
    gray = '#8c8c8c'
};

export function Culori() {
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
            case 0: return Colors.blue;
            case 1: return Colors.gray;
            case 2: return Colors.green;
            case 3: return Colors.pink;
            case 4: return Colors.purple;
            case 5: return Colors.red;
            case 6: return Colors.yellow;
            default:
                break;
        }
        return Colors.blue;
    }

    useEffect(() => {
        setVerifColor('primary');
        setChosenColor(getRandomColor());
        setHasCheated(false);
    }, []);

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Priviţi cu atenţie forma
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            target: () => shapeRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
        }, {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Alegeţi din lista de mai jos culoarea formei
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            target: () => choiceRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            prevButtonProps: {
                children: <ArrowLeft size={25} />
            }

        },
        {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Treceţi peste acest exerciţiu
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            description: 'Nu veţi primi puncte de progres dacă treceţi peste exerciţiu',
            target: () => skipRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            prevButtonProps: {
                children: <ArrowLeft size={25} />
            }
        }, {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Afisaţi răspunsul corect al exerciţiului
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            description: 'Nu veţi primi puncte de progres dacă afisaţi răspunsul corect',
            target: () => cheatRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            prevButtonProps: {
                children: <ArrowLeft size={25} />
            }
        }, {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Verificaţi răspunsul introdus
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            target: () => ansRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            prevButtonProps: {
                children: <ArrowLeft size={25} />
            }
        }
    ];

    const MainContent = () => {
        return (
            <div className="culori-card-holder">
                <Card css={{ width: '70%', height: '300px' }}>
                    <Card.Header css={{ fontFamily: 'DM Sans', borderBottom: '1px solid #ccc' }}>
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            ref={shapeRef}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-triangle" width='100' height='100'
                                fill={chosenColor?.toString()}
                            >
                                <path d="M 50,10 90,90 10,90 z" />
                            </svg>
                        </div>
                        <Divider type='horizontal' style={{ width: '100px', marginTop: '0' }} />
                        <div ref={choiceRef}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.blue)}
                                color={answerColor === Colors.blue ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.blue) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.blue); return;
                                }}
                            >Albastru</Button>
                            <Spacer x={1} />
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.gray)}
                                color={answerColor === Colors.gray ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.gray) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.gray); return;
                                }}
                            >Gri</Button>
                            <Spacer x={1} />
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.green)}
                                color={answerColor === Colors.green ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.green) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.green); return;
                                }}
                            >Verde</Button>
                            <Spacer x={1} />
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.pink)}
                                color={answerColor === Colors.pink ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.pink) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.pink); return;
                                }}
                            >Roz</Button>
                            </div>
                        <Spacer y={1}/>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spacer x={1} />
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.purple)}
                                color={answerColor === Colors.purple ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.purple) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.purple); return;
                                }}
                            >Mov</Button>

                            <Spacer x={1} />
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.red)}
                                color={answerColor === Colors.red ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.red) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.red); return;
                                }}
                            >Roşu</Button>
                            <Spacer x={1} />
                            <Button
                                size='sm'
                                flat={!(answerColor === Colors.yellow)}
                                color={answerColor === Colors.yellow ? 'success' : 'primary'}
                                onPress={() => {
                                    if (answerColor === Colors.yellow) { setAnswerColor(null); return; }
                                    setAnswerColor(Colors.yellow); return;
                                }}
                            >Galben</Button>
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
                <TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible} />
                <div className="background-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button light auto size='xs' icon={<ArrowLeft size="24" />}
                            css={{ width: "36px", height: "36px" }}
                            onPress={() => navigate(-1)}
                        />
                        <Button light auto size='xs' icon={<AiOutlineQuestion size="24" />}
                            css={{ width: "36px", height: "36px" }}
                            onPress={() => { setTourVisible(true) }}
                        />
                    </div>
                    <h3 style={{ textAlign: 'center', fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: '20px'}}>
                        Recunoaşterea Culorilor
                    </h3>

                    {swap && <AnimatedPage><MainContent /></AnimatedPage>}
                    {!swap && <AnimatedPage><MainContent /></AnimatedPage>}

                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef} css={{fontFamily: 'DM Sans'}}
                            onPress={() => {
                                setHasCheated(false);
                                setSwap(!swap);
                                setChosenColor(getRandomColor());
                                setAnswerColor(null);
                            }}
                        >
                            Treci Peste
                        </Button>
                        <Spacer x={2}/>
                        <Tooltip contentColor='warning' placement='top' shadow content={
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Warning2 color='#f5a524' />
                                    <Spacer x={1} />
                                    <span>Nu vei mai primi puncte de progres pentru acest exercitiu.</span>
                                </div>
                        }>
                        <Button size='lg' color='warning' flat ref={cheatRef} css={{fontFamily: 'DM Sans'}}
                            onPress={() => {
                                setHasCheated(false);
                                setAnswerColor(chosenColor);
                            }}
                        >
                            Arată Răspunsul
                        </Button>
                        </Tooltip>
                        <Spacer x={2}/>
                        <Button size='lg' ref={ansRef} css={{fontFamily: 'DM Sans'}}
                            onPress={() => {
                                if (chosenColor === answerColor) {
                                    setVerifColor('success');
                                    setTimeout(() => {
                                        setVerifColor('primary');
                                    }, 500);
                                    setAnswerColor(null);
                                    setChosenColor(getRandomColor());
                                    setSwap(!swap);
                                    setSuccessSound(true);
                                    if (hasCheated) {
                                        setHasCheated(false);
                                    } else {
                                        let copy = { ...progress.value };
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