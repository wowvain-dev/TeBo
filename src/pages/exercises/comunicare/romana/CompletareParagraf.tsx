import './CompletareParagraf.sass';
import stick_llama from '../../.././../assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '@/components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import React, {useEffect, useRef, useState} from "react";
import {
    useProgressContext,
    useDifficultyContext,
    useStorageContext,
    useSettingsContext, useDiplomaContext, StorageContainer
} from '../../../../services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, CiWarning, HiOutlineSpeakerphone, HiOutlineSpeakerWave} from "react-icons/all";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';
import {Letter} from '@/types/Letter';
import random from 'random';
import {LetterType} from '@/types/Letter';
import ConfettiExplosion from "react-confetti-explosion";

export function CompletareParagraf() {
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

    const [successSound, setSuccessSound] = useState(false);
    const [failureSound, setFailureSound] = useState(false);
    const [letterSound, setLetterSound] = useState(false);

    const [isExploding, setIsExploding] = useState(false);
    const [paragraphIndex, setParagraphIndex] = useState<number>(0);
    const [openMaintenanceModal, setOpenMaintenanceModal] = useState<boolean>(true);

    let paragraphRef = useRef(null);
    let choiceRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);

    useEffect(() => {
        setOpenMaintenanceModal(true);
        setVerifColor('primary');
        setHasCheated(false);
        let paragraf_progress = progress.value.getField("comunicare", "romana", "paragraf");
        setParagraphIndex(paragraf_progress.current < paragraf_progress.total ?
            paragraf_progress.current : paragraf_progress.total - 1
        );
        // setParagraphIndex(progress.value.level1.comunicare.parts.get("romana")?.parts.get("paragraf")?.current <
        //     progress.value.level1.comunicare.parts.get("romana")?.parts.get("paragraf").total ?
        //     progress.value.level1.comunicare.parts.get("romana")?.parts.get("paragraf")?.current :
        //     progress.value.level1.comunicare.parts.get("romana")?.parts.get("paragraf")?.total
    },[]);

    const settings = useSettingsContext();
    const avatar = settings.value.settings.avatar;

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Citiți paragraful
                </div>
            ),
            description: <div style={{display: 'flex'}}>
                <div style={{flex: '1'}}>
                    Completați spațiile libere cu răspunsul corect
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={avatar.getStick()} alt='Llama ajutatoare'/>
            </div>,
            target: () => paragraphRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {}
        },
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Alegeţi opţiunea corectă
                </div>
            ),
            target: () => choiceRef.current,
            description: (<div style={{display: 'flex'}}>
                <div style={{flex: '1'}}>
                    Decideți dacă litera e consană/vocală și selectați opțiunea corectă.
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={avatar.getStick()} alt='Llama ajutatoare'/>
            </div>),
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
                    Afisaţi răspunsul corect al exerciţiului
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
        return(
            <div className="paragraf-card-holder">
                <Card css={{width: '85%', height: '350px'}}>
                    <Card.Header css={{fontFamily: 'DM Sans', borderBottom: '1px solid #ccc'}}>
                        Completați textul următor
                    </Card.Header>
                    <Card.Body
                        ref={paragraphRef}
                        css={{
                        fontFamily: "DM Sans",
                        textAlign: 'center',
                    }}>
                        <div>
                            <h2 style={{marginBottom: "1px"}}>{storage.value.paragraphs.paragraphs[paragraphIndex].title}</h2>
                            <h4 style={{textAlign: "right", marginRight: "20px"}}>de {storage.value.paragraphs.paragraphs[paragraphIndex].author}</h4>
                        </div>
                        <div style={{paddingLeft: "25px", paddingRight: "25px"}}>
                            {storage.value.paragraphs.paragraphs[paragraphIndex].getJSX()}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    return(
        <AnimatedPage>
            <Modal
                aria-labelledby={"modal-title"}
                open={openMaintenanceModal}
                onClose={() => {
                    setOpenMaintenanceModal(false)
                }}
                style={{padding: "15px"}}
            >
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{fontFamily: "DM Sans", textAlign: "left"}}>
                        <h3>Heads up!</h3> <p style={{fontFamily: "DM Sans", fontSize: "20px"}}>Acest exercițiu este incă work in progress. Sistemul de verificare funcționează dar:</p> <ul>
                        <li>nu poți da skip la paragrafe;</li>
                        <li>nu poți primi feedback pe răspunsuri individuale;</li>
                        <li>poți da bypass la paragraf primind progress chiar dacă apeși pe <i>Arată Răspunsul;</i></li>
                    </ul>
                        <p style={{fontFamily: "DM Sans", fontSize: "20px"}}>Din cauza acestora, exercițiul nu e inclus înca în sistemul de diplomă.</p>
                    </div>
                    <div>
                        <CiWarning  size={250} color={"#deac72"}/>
                    </div>
                </div>
                <Button style={{fontFamily: "DM Sans", marginTop: '25px'}}
                    onPress={() => setOpenMaintenanceModal(false)}
                >Confirm citirea</Button>
            </Modal>
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
            <div className="card-holder paragraf">
                <Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps}/>
                <TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible} />

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

                    {swap && <AnimatedPage><MainContent/></AnimatedPage>}
                    {!swap && <AnimatedPage><MainContent/></AnimatedPage>}

                    <Spacer y={1}/>

                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef} css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    setHasCheated(false);
                                    setSwap(!swap);
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
                                        let new_storage = {...storage} as StorageContainer;
                                        // new_storage.value.paragraphs.paragraphs[0]
                                        //     .choices.forEach((val, index, array) => {
                                        //         val = new_storage.value.paragraphs.paragraphs[0].answers[index].correct;
                                        // });
                                        for (let i = 0; i < new_storage.value.paragraphs.paragraphs[paragraphIndex].answers.length; i++) {
                                            new_storage.value.paragraphs.paragraphs[paragraphIndex].choices[i] =
                                                storage.value.paragraphs.paragraphs[paragraphIndex].answers[i].correct;
                                        }
                                        storage.setValue(new_storage.value);
                                        setSwap(!swap);
                                    }}
                            >
                                Arată Răspunsul
                            </Button>
                        </Tooltip>
                        <Spacer x={2}/>
                        {isExploding && <ConfettiExplosion/>}
                        <Button size='lg' color={verifColor as NormalColors} ref={ansRef}
                                css={{fontFamily: 'DM Sans'}}
                                onPress={() => {
                                    // TODO(wowvain-dev): REPLACE
                                    let is_correct = true;

                                    for (let i = 0; i < storage.value.paragraphs.paragraphs[paragraphIndex].answers.length; i++) {
                                        if (storage.value.paragraphs.paragraphs[paragraphIndex].choices[i] !==
                                            storage.value.paragraphs.paragraphs[paragraphIndex].answers[i].correct
                                        ) is_correct = false;
                                    }

                                    if (is_correct) {
                                        setVerifColor('success');
                                        setTimeout(() => {
                                            setVerifColor('primary');
                                        }, 500);
                                        setSwap(!swap);
                                        setSuccessSound(true);
                                        if (hasCheated) {
                                            setHasCheated(false);
                                        } else {
                                            let copy = {...progress.value};
                                            let newProgress: ExerciseProgress =
                                                copy.level1.comunicare.parts.get('romana')
                                                    ?.parts.get('paragraf') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                            // @ts-ignore
                                            newProgress.current += 1;

                                            copy.level1.comunicare.parts.get('romana')
                                                ?.parts.set('paragraf', newProgress);

                                            let newManager: ProgressManager = new ProgressManager();
                                            newManager.level1 = copy.level1;
                                            newManager.level2 = copy.level2;
                                            newManager.level3 = copy.level3;
                                            progress.setValue(newManager);
                                            progress.value.scriere();

                                            let litere_progress = progress.value.getField("comunicare", "romana", "litere");
                                            let vocale_progress = progress.value.getField("comunicare", "romana", "vocale");
                                            let adevar_progress = progress.value.getField("comunicare", "romana", "adevar");
                                            let paragraf_progress = progress.value.getField("comunicare", "romana", "paragraf");

                                            if (paragraf_progress.current === paragraf_progress.total) {
                                                setIsExploding(true);
                                                if (litere_progress.current >= litere_progress.total &&
                                                    adevar_progress.current >= adevar_progress.total &&
                                                    vocale_progress.current >= vocale_progress.total
                                                ) {
                                                    diploma.value.setOpenRomana(true);
                                                }
                                            }
                                            setParagraphIndex(paragraf_progress.current < paragraf_progress.total ?
                                                paragraf_progress.current : paragraf_progress.total - 1
                                            );
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
