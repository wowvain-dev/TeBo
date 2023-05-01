import './Fractii.sass';
import { useDifficultyContext, useProgressContext } from '../../../../services/context';
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";
import AnimatedPage from '@/components/AnimatedPage';
import { Button, Card, Input, Modal, NormalColors, Spacer, Tooltip } from '@nextui-org/react';
import {ArrowLeft, ArrowRight, Warning2} from "iconsax-react";
import {Divider, Tour, TourProps} from "antd";
import Fraction from 'fraction.js';
import random from 'random';
import { FractionCanvas } from '@/components/FractionCanvas';
import { ProgressManager, ExerciseProgress } from '@/services/ProgressManager';
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerWave} from "react-icons/all";
import stick_llama from "@/assets/stick-LLAMA-nerd-yellow.png";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';

type Fractie = {
    numitor: number;
    numarator: number,
};

export function Fractii() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [tourVisible, setTourVisible] = useState(false);
    const [a, setA] = useState<string>('');
    const [b, setB] = useState<string>('');
    const [fraction, setFraction] = useState<Fractie>();
    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);

    useEffect(() => {
        setVerifColor('primary');
        setHasCheated(false);
        setA('');
        setB('');
        console.log(`allow wholes: ${difficulty.value.fractii.allowWholes}`)
        let numarator = random.int(difficulty.value.fractii.lowLimit, difficulty.value.fractii.maxLimit);
        let numitor = random.int(1, difficulty.value.fractii.allowWholes ? (numarator * 2 - 1) : numarator);
        while (numitor === numarator) {
          numitor = random.int(1, difficulty.value.fractii.allowWholes ? (numarator * 2 - 1) : numarator);
        }
        setFraction(
            {
                numarator: numarator,
                numitor: numitor
            }
        );
    }, []);

    let diagramRef = useRef(null);
    let fractionRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Priviţi diagrama şi număraţi câte din numărul total de felii sunt colorate.
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => diagramRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Completaţi câmpurile ca să obţineţi o fracţie ce reprezintă desenul anterior
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => fractionRef.current,
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

    return (
        <AnimatedPage>
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)} />
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)} />
            <div className="card-holder fractii">
                <Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps} />
                <TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible} />
                <div className="background-card">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button light auto size='xs' icon={<ArrowLeft size="24" />}
                                css={{ width: "36px", height: "36px" }}
                                onPress={() => navigate(-1)}
                        />
                        <Button light auto size='xs' icon={<AiOutlineQuestion size="24" />}
                                css={{ width: "36px", height: "36px" }}
                                onPress={() => setTourVisible(true)}
                        />
                    </div>
                    <h3 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: '20px'
                    }}>
                        Fracţii
                    </h3>
                    {swap && <AnimatedPage>
                        <div className="fraction-card-holder">
                            <Card css={{ width: '70%', height: '300px' }}>
                                <Card.Header css={{ fontFamily: 'DM Sans', borderBottom: '1px solid #ccc' }}>
                                    Scrieţi fracţia reprezentată în desen
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
                                    <div className="fraction-content">
                                        <div className="canvas-container" ref={diagramRef}>
                                            {/* <canvas></canvas>
                                            lmao */}
                                            <FractionCanvas nominator={fraction?.numitor ?? 0} denominator={fraction?.numarator ?? 0} />
                                        </div>
                                        <Divider type="vertical" style={{ height: '100%' }} />
                                        <div className="fraction-container">
                                            <div className="fraction-input" ref={fractionRef}>
                                                <Input
                                                    placeholder='?'
                                                    value={a}
                                                    onChange={e => setA(e.target.value)}
                                                    style={{ textAlign: 'center', width: '100px' }} size='lg' />
                                                <Divider type="horizontal" />
                                                <Input
                                                    placeholder='?'
                                                    value={b}
                                                    onChange={e => setB(e.target.value)}
                                                    style={{ textAlign: 'center', width: '100px' }} size='lg' />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </AnimatedPage>
                    }
                    {!swap && <AnimatedPage>
                        <div className="fraction-card-holder">
                          <Card css={{ width: '70%', height: '300px' }}>
                              <Card.Header css={{ fontFamily: 'DM Sans', borderBottom: '1px solid #ccc' }}>
                                  Scrieţi fracţia reprezentată în desen
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
                                  <div className="fraction-content">
                                      <div className="canvas-container" ref={diagramRef}>
                                          {/* <canvas></canvas>
                                            lmao */}
                                          <FractionCanvas nominator={fraction?.numitor ?? 0} denominator={fraction?.numarator ?? 0} />
                                      </div>
                                      <Divider type="vertical" style={{ height: '100%' }} />
                                      <div className="fraction-container">
                                          <div className="fraction-input" ref={fractionRef}>
                                              <Input
                                                placeholder='?'
                                                value={a}
                                                onChange={e => setA(e.target.value)}
                                                style={{ textAlign: 'center', width: '100px' }} size='lg' />
                                              <Divider type="horizontal" />
                                              <Input
                                                placeholder='?'
                                                value={b}
                                                onChange={e => setB(e.target.value)}
                                                style={{ textAlign: 'center', width: '100px' }} size='lg' />
                                          </div>
                                      </div>
                                  </div>
                              </Card.Body>
                          </Card>
                      </div>
                        </AnimatedPage>
                    }
                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef}
                            css={{ fontFamily: 'DM Sans' }}
                                onPress={() => {
                                    setHasCheated(false);
                                    setA('');
                                    setB('');
                                    let numarator = random.int(difficulty.value.fractii.lowLimit, difficulty.value.fractii.maxLimit);
                                    let numitor = random.int(1, difficulty.value.fractii.allowWholes ? (numarator * 2 - 1) : numarator);
                                    while (numitor === numarator) {
                                        numitor = random.int(1, difficulty.value.fractii.allowWholes ? (numarator * 2 - 1) : numarator);
                                    }
                                    setFraction(
                                      {
                                          numarator: numarator,
                                          numitor: numitor
                                      }
                                    );
                                    setSwap(!swap);
                                }}
                        >
                            Treci Peste
                        </Button>
                        <Spacer x={2} />
                        <Tooltip contentColor='warning'
                            placement='top'
                            shadow
                            content={
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Warning2 color='#f5a524' />
                                    <Spacer x={1} />
                                    <span>Nu vei mai primi puncte de progres pentru acest exercitiu.</span>
                                </div>
                            }
                        >
                            <Button size='lg' flat color="warning" ref={cheatRef}
                                css={{ fontFamily: 'DM Sans' }}
                                onPress={() => {
                                    setHasCheated(true);
                                    setA(fraction?.numitor.toString() ?? '');
                                    setB(fraction?.numarator.toString() ?? '');
                                }}
                            >Arată Răspunsul</Button>
                        </Tooltip>
                        <Spacer x={2} />
                        <Button size='lg' color={verifColor as NormalColors} ref={ansRef}
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                if (new Fraction(`${fraction?.numitor ?? 0}/${fraction?.numarator ?? 0}`)
                                        .equals(new Fraction(`${Number.isNaN(parseInt(a)) ? 0 : parseInt(a)}/${Number.isNaN(parseInt(b)) ? 1 : parseInt(b)}`))) {
                                    setVerifColor('success');
                                    setTimeout(() => {
                                        setVerifColor('primary');
                                    }, 500);
                                    setA('');
                                    setB('');
                                    let numarator = random.int(difficulty.value.fractii.lowLimit, difficulty.value.fractii.maxLimit);
                                    let numitor = random.int(1, numarator * 2);
                                    setFraction(
                                        {
                                            numarator: numarator,
                                            numitor: numitor
                                        }
                                    );
                                    setSwap(!swap);
                                    setSuccessSound(true);
                                    console.log('correct');
                                    if (hasCheated) {
                                        setHasCheated(false);
                                    } else {
                                        let copy = { ...progress.value };
                                        let newProgress: ExerciseProgress =
                                            copy.level1.matematica.parts.get('aritmetica')
                                                ?.parts.get('fractii') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                        // @ts-ignore
                                        newProgress.current += 1;

                                        copy.level1.matematica.parts.get('aritmetica')
                                            ?.parts.set('fractii', newProgress);

                                        let newManager: ProgressManager = new ProgressManager();
                                        newManager.level1 = copy.level1;
                                        newManager.level2 = copy.level2;
                                        newManager.level3 = copy.level3;
                                        progress.setValue(newManager);
                                        progress.value.scriere();
                                    }
                                } else {
                                    setFailureSound(true);
                                    console.log('INCORRECT');
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