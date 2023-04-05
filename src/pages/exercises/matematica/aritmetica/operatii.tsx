import './operatii.scss';
import stick_llama from '../../.././../assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '@/components/AnimatedPage';
import { Button, Card, Input, NormalColors, Spacer, Modal, Tooltip } from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import { useNavigate } from 'react-router-dom';
import { ExpressionTree } from '@/types/ExpressionTree';
import {useEffect, useRef, useState} from "react";
import { useProgressContext, useDifficultyContext } from '../../../../services/context';
import { ExerciseProgress, ProgressManager } from '@/services/ProgressManager';
import {notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerphone, HiOutlineSpeakerWave} from "react-icons/all";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';

function WrongAnswerNotification() {
    notification.open({
        message: 'Răspuns greşit',
        description: 'Mai încearcă!',
        duration: 2,
        icon: <Warning2 color='#f31260' />,
        closeIcon: <CloseCircle />,
        placement: 'topRight'
    })
}

export function Operatii() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [tree, setTree] = useState(new ExpressionTree());
    const [inputValue, setInputValue] = useState('');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [tourVisible, setTourVisible] = useState(false);

    let eqRef = useRef(null);
    let inputRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);

    useEffect(() => {
        setVerifColor('primary');
        setTree(ExpressionTree.random(
            difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
            difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
        ));
        setHasCheated(false);
    }, []);

    console.log(tree.root?.infix());

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                Calculează expresia din stânga egalului
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{flex: '1'}}></div>
                    <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                </div>
                </div>
            ),
            target: () => eqRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {}
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Introduceţi rezultatul obţinut în câmpul de text
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
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

    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);

    return (
        <AnimatedPage>
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
            <div className="card-holder operatii">
                <Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps}/>
                <TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible} />
                <div className="background-card">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button light auto size='xs' icon={<ArrowLeft size="24" />}
                                css={{ width: "36px", height: "36px" }}
                                onPress={() => navigate(-1)}
                        />
                        <Button light auto size='xs' icon={<AiOutlineQuestion size="24" />}
                                css={{ width: "36px", height: "36px" }}
                                onPress={() => {setTourVisible(true)}}
                        />

                    </div>
                    <h3 style={{ textAlign: 'center',
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                    }}>
                        Operaţii
                    </h3>
                    {swap && (
                        <AnimatedPage>
                            <div className="equation-card-holder">
                                <Card
                                    css={{ width: '70%', height: '200px' }}
                                >
                                    <Card.Header
                                        css={{
                                            fontFamily: 'DM Sans',
                                            borderBottom: '1px solid #ccc',
                                        }}>
                                        Calculaţi
                                    </Card.Header>
                                    <Card.Body css={{
                                        fontFamily: 'DM Sans',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyCenter: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <span ref={eqRef} style={{ fontSize: '2rem' }}>
                                            {tree.expression}=
                                        </span>
                                        <Input
                                            ref={inputRef}
                                            placeholder="?"
                                            width="100px"
                                            underlined
                                            style={{
                                                fontSize: '2rem',
                                                textAlign: 'center'
                                            }}
                                            css={{
                                                display: 'inline-block',
                                                fontFamily: 'DM Sans',
                                            }}
                                            value={inputValue}
                                            autoFocus
                                            onChange={e => setInputValue(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    console.log(hasCheated);
                                                    if (parseInt(inputValue) === ExpressionTree.evaluate(tree.root)) {
                                                        console.log('CORRECT')
                                                        setInputValue('');
                                                        setTree(ExpressionTree.random(
                                                            difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
                                                            difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
                                                        ));
                                                        setSwap(!swap);
                                                        setSuccessSound(true);
                                                        if (hasCheated) {
                                                            setHasCheated(false);
                                                        } else {

                                                            let copy = { ...progress.value };
                                                            let newProgress: ExerciseProgress =
                                                                copy.level1.matematica.parts.get('aritmetica')
                                                                    ?.parts.get('operatii') ?? new ExerciseProgress(
                                                                        0, 0
                                                                    );
                                                            // @ts-ignore
                                                            newProgress.current += 1;

                                                            copy.level1.matematica.parts.get('aritmetica')
                                                                ?.parts.set('operatii', newProgress);

                                                            let newManager: ProgressManager = new ProgressManager();
                                                            newManager.level1 = copy.level1;
                                                            newManager.level2 = copy.level2;
                                                            newManager.level3 = copy.level3;
                                                            progress.setValue(newManager);
                                                            progress.value.scriere();
                                                        }
                                                    } else {
                                                        console.log('INCORRECT')
                                                    }
                                                }
                                            }}
                                        />

                                    </Card.Body>
                                </Card>
                            </div>
                        </AnimatedPage>
                    )
                    }
                    {!swap && (
                        <AnimatedPage>
                            <div className="equation-card-holder">
                                <Card
                                    css={{ width: '70%', height: '200px' }}
                                >
                                    <Card.Header
                                        css={{
                                            fontFamily: 'DM Sans',
                                            borderBottom: '1px solid #ccc'
                                        }}>Calculaţi</Card.Header>
                                    <Card.Body css={{
                                        fontFamily: 'DM Sans',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyCenter: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <span ref={eqRef} style={{ fontSize: '2rem' }}>
                                            {tree.expression}=
                                        </span>
                                        <Input
                                            ref={inputRef}
                                            placeholder="?"
                                            width="100px"
                                            underlined
                                            style={{
                                                fontSize: '2rem',
                                                textAlign: 'center'
                                            }}
                                            css={{
                                                display: 'inline-block',
                                                fontFamily: 'DM Sans',
                                            }}
                                            value={inputValue}
                                            autoFocus
                                            onChange={e => setInputValue(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    console.log(hasCheated);
                                                    if (parseInt(inputValue) === ExpressionTree.evaluate(tree.root)) {
                                                        console.log('CORRECT')
                                                        setInputValue('');
                                                        setTree(ExpressionTree.random(
                                                            difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
                                                            difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
                                                        ));
                                                        setSwap(!swap);
                                                        setSuccessSound(true);
                                                        if (hasCheated) {
                                                            setHasCheated(false);
                                                        } else {

                                                            let copy = { ...progress.value };
                                                            let newProgress: ExerciseProgress =
                                                                copy.level1.matematica.parts.get('aritmetica')
                                                                    ?.parts.get('operatii') ?? new ExerciseProgress(
                                                                        0, 0
                                                                    );
                                                            // @ts-ignore
                                                            newProgress.current += 1;

                                                            copy.level1.matematica.parts.get('aritmetica')
                                                                ?.parts.set('operatii', newProgress);

                                                            let newManager: ProgressManager = new ProgressManager();
                                                            newManager.level1 = copy.level1;
                                                            newManager.level2 = copy.level2;
                                                            newManager.level3 = copy.level3;
                                                            progress.setValue(newManager);
                                                            progress.value.scriere();
                                                        }
                                                    } else {
                                                        console.log('INCORRECT')
                                                    }
                                                }
                                            }}
                                        />

                                    </Card.Body>
                                </Card>
                            </div>
                        </AnimatedPage>)}
                    <div className="buttons-container">
                        <Button ref={skipRef}
                            size='lg' flat
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setInputValue('');
                                setTree(ExpressionTree.random(
                                    difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
                                    difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
                                ));
                                setHasCheated(false);
                                setSwap(!swap);
                            }}
                        >Treci Peste</Button>
                        <Spacer x={2} />
                        <Tooltip contentColor='warning'
                        placement='top'
                        shadow 
                        content={
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Warning2 color='#f5a524'/>
                            <Spacer x={1}/>
                            <span>Nu vei mai primi puncte de progres pentru acest exercitiu.</span>
                            </div>
                        }>
                        <Button
                            ref={cheatRef}
                            size='lg' flat color="warning"
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setHasCheated(true);
                                setInputValue(ExpressionTree.evaluate(tree.root).toString());
                            }}
                        >Arată Răspunsul</Button>
                        </Tooltip>
                        <Spacer x={2} />
                        <Button  ref={ansRef}
                            size='lg' color={verifColor as NormalColors}
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                console.log(hasCheated);
                                if (parseInt(inputValue) === ExpressionTree.evaluate(tree.root)) {
                                    setVerifColor('success');
                                    setTimeout(() => {
                                        setVerifColor('primary');
                                    }, 500);
                                    console.log('CORRECT')
                                    setInputValue('');
                                    setTree(ExpressionTree.random(
                                        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
                                        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
                                    ));
                                    setSwap(!swap);
                                    setSuccessSound(true);
                                    if (hasCheated) {
                                        setHasCheated(false);
                                    } else {
                                        let copy = { ...progress.value };
                                        let newProgress: ExerciseProgress =
                                            copy.level1.matematica.parts.get('aritmetica')
                                                ?.parts.get('operatii') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                        // @ts-ignore
                                        newProgress.current += 1;

                                        copy.level1.matematica.parts.get('aritmetica')
                                            ?.parts.set('operatii', newProgress);

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
                        >Verifică</Button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}