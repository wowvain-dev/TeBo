import './Adevar.sass';
import AnimatedPage from '@/components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import React, {useEffect, useRef, useState} from "react";
import {
	useProgressContext,
	useDifficultyContext,
	useSettingsContext,
	useDiplomaContext,
	useStorageContext
} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerphone, HiOutlineSpeakerWave} from "react-icons/all";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import check_tour from '@/assets/audio/ui/check_tour.aac';
import skip_tour from '@/assets/audio/ui/skip_tour.aac';
import cheat_tour from '@/assets/audio/ui/cheat_tour.aac';
import ReactHowler from 'react-howler';
import {DiplomaManager} from "@/services/DiplomaManager";
import {Letter, LetterType} from "@/types/Letter";
import random from "random";
import ConfettiExplosion from "react-confetti-explosion";
import {CheckSentence} from "@/types/CheckSentence";

export function Adevar() {
	const diploma = useDiplomaContext();
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
	const [chosenAnswer, setChosenAnswer] = useState<boolean | null>(null);
	const [sentence, setSentence] = useState<CheckSentence | null>(null);

	const [successSound, setSuccessSound] = useState(false);
	const [failureSound, setFailureSound] = useState(false);
	const [letterSound, setLetterSound] = useState(false);

	const [isExploding, setIsExploding] = useState(false);

	let letterRef = useRef(null);
	let choiceRef = useRef(null);
	let skipRef = useRef(null);
	let cheatRef = useRef(null);
	let ansRef = useRef(null);

	const setRandomSentence = () => {
		setSentence(storage.value.check_sentences
			.check_sentences[random.int(0, storage.value.check_sentences.check_sentences.length - 1)] ?? null);
	}

	useEffect(() => {
		setVerifColor('primary');
		setRandomSentence();
		setChosenAnswer(null);
		setHasCheated(false);
	}, []);

	const settings = useSettingsContext();
	const avatar = settings.value.settings.avatar;

	const tourSteps: TourProps['steps'] = [
		{
			title: (<div style={{display: 'flex', flexDirection: 'column'}}>
					Citește propoziția
				</div>
			),
			description: <div style={{display: 'flex'}}>
				<div style={{flex: '1'}}>
					Verifică daca propoziția este formulată corect.
				</div>
				<Divider type={"vertical"} style={{height: '100px'}}/>
				<img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
					 src={avatar.getStick()} alt='Llama ajutatoare'/>
			</div>,
			target: () => letterRef.current,
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
					Alege dacă propoziția are sau nu sens.
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
			<div className="adevar-card-holder">
				<Card css={{width: '70%', height: '250px'}}>
					<Card.Header css={{fontFamily: 'DM Sans', borderBottom: '1px solid #ccc'}}>
						Alegeți opțiunea corectă
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
							<span>{sentence?.sentence ?? ""}</span>
							{/*<Button animated={false}*/}
							{/*		auto light css={{w: '75px', h: '75px', fontFamily: 'DM Sans', fontSize: '$4xl'}}*/}
							{/*		onPress={() => setLetterSound(true)}*/}
							{/*>{chosenLetter?.character}</Button>*/}
							{/*<Spacer x={1}/>*/}
							{/*<Button*/}
							{/*	auto light animated={false}*/}
							{/*	css={{w: '75px', h: '75px', fontFamily: 'DM Sans', fontSize: '$4xl'}}*/}
							{/*	onPress={() => setLetterSound(true)}*/}
							{/*>{chosenLetter?.character?.toUpperCase()}</Button>*/}
						</div>
						<Divider type='horizontal' style={{width: '100px', marginTop: '0'}}/>
						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} ref={choiceRef}>
							<Button
								size='md'
								flat={!(chosenAnswer === false)}
								color={chosenAnswer === false ? 'success' : 'primary'}
								onPress={() => {
									switch (chosenAnswer) {
										case false:
											setChosenAnswer(null);
											return;
										case true:
											setChosenAnswer(false);
											return;
										case null:
											setChosenAnswer(false);
											return;
									}
								}}
							>Incorectă</Button>
							<Spacer x={2}/>
							<Button
								size='md'
								flat={!(chosenAnswer === true)}
								color={chosenAnswer === true ? 'success' : 'primary'}
								onPress={() => {
									switch (chosenAnswer) {
										case false:
											setChosenAnswer(true);
											return;
										case true:
											setChosenAnswer(null);
											return;
										case null:
											setChosenAnswer(true);
									}
								}}
							>Corectă</Button>
						</div>
					</Card.Body>
				</Card>
			</div>
		)
	}

	return (
		<AnimatedPage>
			<ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
			<ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
			<div className="card-holder vocale">
				<Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps}/>
				<TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible}/>
				<div className='background-card'>
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
						Recunoașterea Propozițiilor
					</h3>

					{swap && <AnimatedPage><MainContent/></AnimatedPage>}
					{!swap && <AnimatedPage><MainContent/></AnimatedPage>}

					<div className="buttons-container">
						<Button size='lg' flat ref={skipRef} css={{fontFamily: 'DM Sans'}}
								onPress={() => {
									setHasCheated(false);
									setSwap(!swap);
									setChosenAnswer(null);
									setRandomSentence();
									// setChosenType(null);
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
										setChosenAnswer(sentence?.correct ?? null);
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
									if (sentence?.correct === chosenAnswer) {
										setVerifColor('success');
										setTimeout(() => {
											setVerifColor('primary');
										}, 500);
										setRandomSentence();
										setChosenAnswer(null);
										setSwap(!swap);
										setSuccessSound(true);
										if (hasCheated) {
											setHasCheated(false);
										} else {
											let copy = {...progress.value};
											let newProgress: ExerciseProgress =
												copy.level1.comunicare.parts.get('romana')
													?.parts.get('adevar') ?? new ExerciseProgress(
													0, 0
												);
											// @ts-ignore
											newProgress.current += 1;

											copy.level1.comunicare.parts.get('romana')
												?.parts.set('adevar', newProgress);

											let newManager: ProgressManager = new ProgressManager();
											newManager.level1 = copy.level1;
											newManager.level2 = copy.level2;
											newManager.level3 = copy.level3;
											progress.setValue(newManager);
											progress.value.scriere();

											let litere_progress = progress.value.getField("comunicare", "romana", "litere");
											let vocale_progress = progress.value.getField("comunicare", "romana", "vocale");
											let adevar_progress = progress.value.getField("comunicare", "romana", "adevar");

											if (adevar_progress.current === adevar_progress.total) {
												setIsExploding(true);
												if (litere_progress.current >= litere_progress.total &&
													vocale_progress.current >= vocale_progress.total
												) {
													diploma.value.setOpenRomana(true);
												}
											}
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
	)
}
