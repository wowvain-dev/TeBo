import './RecunoastereLitere.sass';
import stick_llama from '../../../../assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '../../../../components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, Car, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {useProgressContext, useDifficultyContext, useStorageContext} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerphone, HiOutlineSpeakerWave} from "react-icons/all";
import success_sound from '../../../../assets/audio/sfx/success_sound.aac';
import failure_sound from '../../../../assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';
import {join} from 'path';
import {Letter} from '@/types/Letter';
import random from 'random';


export function Litere() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [inputValue, setInputValue] = useState('');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [tourVisible, setTourVisible] = useState(false);

    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);
    const [letterSound, setLetterSound] = useState(false);

    const [chosenLetter, setChosenLetter] = useState<Letter | null>(null);

    let storage = useStorageContext();


    console.log(storage.value.letters.letters)

    let audioRef = useRef(null);
    let inputRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);

    useEffect(() => {
        setVerifColor('primary');
        setChosenLetter(storage.value.letters.letters[random.int(0, storage.value.letters.letters.length - 1)]);
        setHasCheated(false);
    }, []);

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Apăsaţi pe buton pentru a asculta litera
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32}/>}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama}
                             alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => audioRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {}
        },
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Introduceţi litera pe care aţi auzit-o în mesajul audio
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32}/>}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama}
                             alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => inputRef.current,
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
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32}/>}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama}
                             alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            description: 'Nu veţi primi puncte de progres dacă treceţi peste exerciţiu',
            target: () => skipRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Afisaţi răspunsul corect al exerciţiului
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32}/>}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama}
                             alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            description: 'Nu veţi primi puncte de progres dacă afisaţi răspunsul corect',
            target: () => cheatRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Verificaţi răspunsul introdus
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32}/>}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama}
                             alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
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
        return (
            <div className="litere-card-holder">
                <Card css={{width: '70%', height: '200px'}}>
                    <Card.Header css={{fontFamily: 'DM Sans', borderBottom: '1px solid #ccc'}}>
                        Scrieţi Litera Auzită
                    </Card.Header>
                    <Card.Body css={{
                        fontFamily: 'DM Sans',
                        justifyContent: 'center',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyCenter: 'center',
                        alignItems: 'center',
                    }}>
                        <Button ref={audioRef}
                                auto light color="primary" icon={<HiOutlineSpeakerWave size={64}/>}
                                css={{w: '75px', h: '75px'}}
                                onPress={() => setLetterSound(true)}
                        />
                        <Divider type='vertical' style={{height: '100px'}}/>
                        <Input
                            ref={inputRef}
                            placeholder='?'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            style={{textAlign: 'center', width: '50px'}} size='lg'
                        />
                    </Card.Body>
                </Card>
            </div>)
    }

    return (
        <AnimatedPage>
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
            <ReactHowler src={`../../src/assets/${chosenLetter?.audioPath}`} playing={letterSound}
                         onEnd={() => setLetterSound(false)}/>
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
            <div className="card-holder litere">
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
                        Recunoaştere Litere
                    </h3>
                    {/*<RandomSentence />*/}
                    {swap && <AnimatedPage><MainContent/></AnimatedPage>}
                    {!swap && <AnimatedPage><MainContent/></AnimatedPage>}

                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef} css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    setHasCheated(false);
                                    setInputValue('');
                                    setSwap(!swap);
                                    setChosenLetter(storage.value.letters.letters[random.int(0, storage.value.letters.letters.length - 1)]);
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
                            <Button size='lg' flat color='warning' ref={cheatRef}
                                    css={{fontFamily: 'DM Sans'}}
                                    onPress={() => {
                                        setHasCheated(true);
                                        setInputValue(chosenLetter?.character ?? '');
                                    }}
                            >
                                Arată Răspunsul
                            </Button>
                        </Tooltip>
                        <Spacer x={2}/>
                        <Button size='lg' color={verifColor as NormalColors} ref={ansRef}
                                css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    if (inputValue === chosenLetter?.character?.toLowerCase() ||
                                        inputValue === chosenLetter?.character?.toUpperCase()
                                    ) {
                                        setVerifColor('success');
                                        setTimeout(() => {
                                            setVerifColor('primary');
                                        }, 500);
                                        console.log('CORRECT')
                                        setInputValue('');
                                        setChosenLetter(storage.value.letters.letters[random.int(0, storage.value.letters.letters.length - 1)]);
                                        setSwap(!swap);
                                        setSuccessSound(true);
                                        if (hasCheated) {
                                            setHasCheated(false);
                                        } else {
                                            let copy = {...progress.value};
                                            let newProgress: ExerciseProgress =
                                                copy.level1.comunicare.parts.get('romana')
                                                    ?.parts.get('litere') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                            // @ts-ignore
                                            newProgress.current += 1;

                                            copy.level1.comunicare.parts.get('romana')
                                                ?.parts.set('litere', newProgress);

                                            let newManager: ProgressManager = new ProgressManager();
                                            newManager.level1 = copy.level1;
                                            newManager.level2 = copy.level2;
                                            newManager.level3 = copy.level3;
                                            progress.setValue(newManager);
                                            progress.value.scriere();
                                        }
                                    } else {
                                        console.log('INCORRECT');
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
                        >
                            Verifică
                        </Button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}