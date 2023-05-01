import './Vocale.sass';
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
import { Letter } from '@/types/Letter';
import random from 'random';
import { LetterType } from '@/types/Letter';


export function Vocale() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const storage = useStorageContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [inputValue, setInputValue] = useState('');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [tourVisible, setTourVisible] = useState(false);
    const [chosenLetter, setChosenLetter] = useState<Letter | null>(null);
    const [chosenType, setChosenType] = useState<LetterType | null>(null);

    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);
    const [letterSound, setLetterSound] = useState(false);

    let letterRef = useRef(null);
    let choiceRef = useRef(null);
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
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Verificaţi dacă litera este vocală sau consoană
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            description: ('Puteţi apăsa pe literă pentru a o asculta'),
            target: () => letterRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            prevButtonProps: {}
        },
        {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Alegeţi opţiunea corectă
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
        // console.log(new Letter('A', '').letterType === LetterType.vowel);


        console.log(`${chosenLetter?.character ?? ''} ${chosenLetter?.letterType ?? null}`);
        // console.log(chosenLetter);

        return (
            <div className="vocale-card-holder">
                <Card css={{ width: '70%', height: '250px' }}>
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
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            ref={letterRef}
                        >
                        <Button animated={false}
                            auto light css={{ w: '75px', h: '75px', fontFamily: 'DM Sans', fontSize: '$4xl' }}
                            onPress={() => setLetterSound(true)}
                        >{chosenLetter?.character}</Button>
                        <Spacer x={1}/>
                        <Button
                            auto light animated={false} css={{ w: '75px', h: '75px', fontFamily: 'DM Sans', fontSize: '$4xl' }}
                            onPress={() => setLetterSound(true)}
                        >{chosenLetter?.character?.toUpperCase()}</Button>
                        </div>
                        <Divider type='horizontal' style={{ width: '100px', marginTop: '0' }} />
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} ref={choiceRef}>
                            <Button
                                size='md'
                                flat={!(chosenType === LetterType.vowel)}
                                color={chosenType === LetterType.vowel ? 'success' : 'primary'}
                                onPress={() => {
                                    if (chosenType === null) {setChosenType(LetterType.vowel); return;}
                                    if (chosenType === LetterType.vowel) {setChosenType(null); return;}
                                    if (chosenType === LetterType.consonant) {setChosenType(LetterType.vowel); return;}
                                }}
                            >Vocală</Button>
                            <Spacer x={2}/>
                            <Button
                                size='md'
                                flat={!(chosenType === LetterType.consonant)}
                                color={chosenType === LetterType.consonant ? 'success' : 'primary'}
                                onPress={() => {
                                    if (chosenType === null) {setChosenType(LetterType.consonant); return;}
                                    if (chosenType === LetterType.consonant) {setChosenType(null); return;}
                                    if (chosenType === LetterType.vowel) {setChosenType(LetterType.consonant); return;}
                                }}
                            >Consoană</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    };

    return (
        <AnimatedPage>
            <ReactHowler src={`../../src/assets/${chosenLetter?.audioPath}`} playing={letterSound} onEnd={() => setLetterSound(false)} />
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)} />
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)} />
            <div className="card-holder vocale">
                <Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps} />
                <TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible} />
                <div className='background-card'>
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
                        Vocale şi Consoane
                    </h3>

                    {swap && <AnimatedPage><MainContent /></AnimatedPage>}
                    {!swap && <AnimatedPage><MainContent /></AnimatedPage>}

                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef} css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setHasCheated(false);
                                setSwap(!swap);
                                setChosenLetter(storage.value.letters.letters[random.int(0, storage.value.letters.letters.length - 1)]);
                                setChosenType(null);
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
                            <Button size='lg' flat color='warning' ref={cheatRef}
                                css={{ fontFamily: 'DM Sans' }} 
                                onPress={() => {
                                    setHasCheated(true);
                                    setChosenType(chosenLetter?.letterType ?? null);
                                }}
                            >
                                Arată Răspunsul
                            </Button>
                        </Tooltip>
                        <Spacer x={2}/>
                        <Button size='lg' color={verifColor as NormalColors} ref={ansRef}
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                if (chosenLetter?.letterType === chosenType) {
                                    setVerifColor('success');
                                    setTimeout(() => {
                                        setVerifColor('primary');
                                    }, 500);
                                    setChosenType(null);
                                    setChosenLetter(storage.value.letters.letters[random.int(0, storage.value.letters.letters.length - 1)]);
                                    setSwap(!swap);
                                    setSuccessSound(true);
                                    if (hasCheated) {
                                        setHasCheated(false);
                                    } else {
                                        let copy = { ...progress.value };
                                        let newProgress: ExerciseProgress =
                                            copy.level1.comunicare.parts.get('romana')
                                                ?.parts.get('vocale') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                        // @ts-ignore
                                        newProgress.current += 1;

                                        copy.level1.comunicare.parts.get('romana')
                                            ?.parts.set('vocale', newProgress);

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
                        >Verifică
                        </Button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}