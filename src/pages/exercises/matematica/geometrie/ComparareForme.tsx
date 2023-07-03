import './Culori.sass';
//@ts-ignore
import stick_llama from '@/assets/stick-LLAMA-nerd-yellow.png';
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
    useSettingsContext,
    useDiplomaContext
} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerWave} from "react-icons/all";
//@ts-ignore
import success_sound from '@/assets/audio/sfx/success_sound.aac';
//@ts-ignore
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';
import random from 'random';
import React from 'react';

const SVG_HEIGHT = 160;
const SVG_WIDTH = 300;

const shapeTypes = ["circle", "rectangle", "triangle"];

type Shape = {
    size: number,
    color: string,
    type: string
};

export enum Colors {
    red = '#e51126',
    blue = '#0072f5',
    green = '#17c964',
    yellow = '#fff566',
    purple = '#681fc0',
    pink = '#ff69c9',
    gray = '#706e6e'
};

export function ComparareForme() {
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

    const [shape1, setShape1] =
        useState<Shape | null>(null);
    const [shape2, setShape2] =
        useState<Shape | null>(null);
    const [differenceIndex, setDifferenceIndex] = useState(0);
    const [selectedIndex, setSelectedIndex]
        = useState<number | null>(null);

    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);
    const [letterSound, setLetterSound] = useState(false);

    let shape1Ref = useRef(null);
    let shape2Ref = useRef(null);
    let choiceRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);

    const generateShapeProps = () => {
        const shapeType
            = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const shapeSize = random.int(50, 100);
        const shapeColor = "#" + Math.floor(Math.random() * 1677215).toString(16);
        const difference = Math.floor(Math.random() * 3);

        const shape1: Shape = {
            type: shapeType,
            size: shapeSize,
            color: shapeColor
        };
        const shape2: Shape = {
            type: (difference === 1 ? shapeTypes.find(type => type !== shapeType) : shapeType) ?? 'triangle',
            size: difference === 0 ? shapeSize + 20 : shapeSize,
            color: difference === 2 ? "#" + Math.floor(Math.random() * 16777213).toString(16) : shapeColor
        };

        const t = Math.random();

        setShape1(t < .5 ? shape1 : shape2);
        setShape2(t < .5 ? shape2 : shape1);
        setDifferenceIndex(difference);
    }

    useEffect(() => {
        const shapeType
            = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const shapeSize = random.int(50, 100);
        const shapeColor = "#" + Math.floor(Math.random() * 1677215).toString(16);
        const difference = Math.floor(Math.random() * 3);

        const shape1: Shape = {
            type: shapeType,
            size: shapeSize,
            color: shapeColor
        };
        const shape2: Shape = {
            type: (difference === 1 ? shapeTypes.find(type => type !== shapeType) : shapeType) ?? 'triangle',
            size: difference === 0 ? shapeSize + 20 : shapeSize,
            color: difference === 2 ? "#" + Math.floor(Math.random() * 16777213).toString(16) : shapeColor
        };
        setVerifColor('primary');
        generateShapeProps();
        setHasCheated(false);

        const t = Math.random();

        setShape1(t < .5 ? shape1 : shape2);
        setShape2(t < .5 ? shape2 : shape1);
        setDifferenceIndex(difference);
    }, []);

    const renderShapes = (i: number) => {
        let shape = (i === 0 ? shape1 : shape2) ?? {
            size: 0, type: 'triangle', color: "#000"
        };
        let shapeElement: JSX.Element = <></>;
        if (shape.type === "circle") {
            shapeElement = (
                <circle key={i}
                        cx={SVG_WIDTH / 2} cy={SVG_HEIGHT / 2}
                        r={shape.size / 2} fill={shape.color}/>
            );
        } else if (shape.type === "rectangle") {
            shapeElement = (
                <rect key={i} x={SVG_WIDTH / 2 - shape.size / 2} y={SVG_HEIGHT / 2 - shape.size / 2}
                      width={shape.size} height={shape.size}
                      fill={shape.color}/>
            );
        } else if (shape.type === "triangle") {
            const triangleHeight = (shape.size * Math.sqrt(3)) / 2;
            shapeElement = (
                <polygon
                    key={i}
                    points={`${SVG_WIDTH / 2 - (shape.size / 2)},${SVG_HEIGHT / 2 + triangleHeight / 3} ${SVG_WIDTH / 2},${SVG_HEIGHT / 2 - 2 * triangleHeight / 3} ${SVG_WIDTH / 2 + (shape.size) / 2},${SVG_HEIGHT / 2 + triangleHeight / 3}`}
                    fill={shape.color}
                />
            );
        }
        return shapeElement;
    }

    const settings = useSettingsContext();
    const avatar = settings.value.settings.avatar;

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Priviți forma din stânga
                </div>
            ),
            target: () => shape1Ref.current,
            description: (<div style={{display: 'flex'}}>
                <div style={{flex: '1'}}>
                    Observați culoarea, tipul și mărimea formei.
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={avatar.getStick()} alt='Llama ajutatoare'/>
            </div>),
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Priviți forma din dreapta
                </div>
            ),
            description: (
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}>
                        Observați culoarea, tipul și mărimea formei.
                    </div>
                    <Divider type={"vertical"} style={{height: '100px'}}/>
                    <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                         src={avatar.getStick()} alt='Llama ajutatoare'/>
                </div>
            ),
            target: () => shape2Ref.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }

        },
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Alegeți răspunsul corect
                </div>
            ),
            description: (
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}>
                        Comparați proprietățile celor două forme și selectați prin care diferă cele doua forme.
                    </div>
                    <Divider type={"vertical"} style={{height: '100px'}}/>
                    <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                         src={avatar.getStick()} alt='Llama ajutatoare'/>
                </div>
            ),
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

    const MainContent = () => {
        // console.log(`shapes ${shapes[0]}, ${shapes[1]}`)
        return (
            <div className="culori-card-holder">
                <Card css={{width: '70%', height: '300px'}}>
                    <Card.Header css={{fontFamily: 'DM Sans', borderBottom: '1px solid #ccc'}}>
                        Prin ce diferă formele?
                    </Card.Header>
                    <Card.Body css={{
                        fontFamily: 'DM Sans',
                        justifyContent: 'center',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyCenter: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}>
                        <div>
                            <div style={{height: `${SVG_HEIGHT}px`, display: 'flex'}}>
                                <svg width={SVG_WIDTH} height={SVG_HEIGHT} ref={shape1Ref}>
                                    {renderShapes(0)}
                                </svg>
                                <Divider type="vertical" style={{height: '100%', color: "#000"}}/>
                                <svg width={SVG_WIDTH} height={SVG_HEIGHT} ref={shape2Ref}>
                                    {renderShapes(1)}
                                </svg>
                            </div>
                            <Divider type='horizontal' style={{width: '100px', marginTop: '0'}}/>
                            <div ref={choiceRef}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Button
                                        size='sm'
                                        flat={!(selectedIndex === 0)}
                                        color={selectedIndex === 0 ? 'success' : 'primary'}
                                        onPress={() => {
                                            if (selectedIndex === 0) {
                                                setSelectedIndex(null);
                                                return;
                                            }
                                            setSelectedIndex(0);
                                            return;
                                        }}
                                    >Mărime</Button>
                                    <Spacer x={1}/>
                                    <Button
                                        size='sm'
                                        flat={!(selectedIndex === 1)}
                                        color={selectedIndex === 1 ? 'success' : 'primary'}
                                        onPress={() => {
                                            if (selectedIndex === 1) {
                                                setSelectedIndex(null);
                                                return;
                                            }
                                            setSelectedIndex(1);
                                            return;
                                        }}
                                    >Formă</Button>
                                    <Spacer x={1}/>
                                    <Button
                                        size='sm'
                                        flat={!(selectedIndex === 2)}
                                        color={selectedIndex === 2 ? 'success' : 'primary'}
                                        onPress={() => {
                                            if (selectedIndex === 2) {
                                                setSelectedIndex(2);
                                                return;
                                            }
                                            setSelectedIndex(2);
                                            return;
                                        }}
                                    >Culoare</Button>
                                </div>
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
                        Comparați Formele
                    </h3>

                    {swap && <AnimatedPage><MainContent/></AnimatedPage>}
                    {!swap && <AnimatedPage><MainContent/></AnimatedPage>}

                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef} css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    generateShapeProps();
                                    setHasCheated(false);
                                    setSwap(!swap);
                                    setAnswerColor(null);
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
                                        setSelectedIndex(differenceIndex);
                                    }}
                            >
                                Arată Răspunsul
                            </Button>
                        </Tooltip>
                        <Spacer x={2}/>
                        <Button size='lg' ref={ansRef} css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    if (selectedIndex === differenceIndex) {
                                        generateShapeProps();
                                        setVerifColor('success');
                                        setTimeout(() => {
                                            setVerifColor('primary');
                                        }, 500);
                                        setSelectedIndex(null);
                                        setSwap(!swap);
                                        setSuccessSound(true);
                                        if (hasCheated) {
                                            setHasCheated(false);
                                        } else {
                                            let copy = {...progress.value};
                                            let newProgress: ExerciseProgress =
                                                copy.level1.matematica.parts.get('geometrie')
                                                    ?.parts.get('comparare') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                            // @ts-ignore
                                            newProgress.current += 1;

                                            copy.level1.matematica.parts.get('geometrie')
                                                ?.parts.set('comparare', newProgress);

                                            let newManager: ProgressManager = new ProgressManager();
                                            newManager.level1 = copy.level1;
                                            newManager.level2 = copy.level2;
                                            newManager.level3 = copy.level3;
                                            progress.setValue(newManager);
                                            progress.value.scriere();

                                            let culori_progress = progress.value.getField("matematica", "geometrie", "culori");
                                            let comparare_progress = progress.value.getField("matematica", "geometrie", "comparare");

                                            if (comparare_progress.current === comparare_progress.total) {
                                                if (culori_progress.current >= comparare_progress.total)
                                                    diploma.value.setOpenGeometrie(true);
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