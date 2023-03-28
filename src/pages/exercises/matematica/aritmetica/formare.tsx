import "./formare.sass";
import AnimatedPage from "@/components/AnimatedPage";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDifficultyContext, useProgressContext} from "../../../../services/context";
import random from "random";
import {FormareType} from "@/services/DifficultyManager";
import {Button, Card, Modal, NormalColors, Spacer, Tooltip} from "@nextui-org/react";
import {ArrowLeft, Warning2} from "iconsax-react";
import {NumberLine} from "@/components/NumberLine";
import {ExerciseProgress, ProgressManager} from "@/services/ProgressManager";

export type FormareNumberType = {
	number: number,
	type: FormareType
};

function generateFormareNumber(type: FormareType) {
	switch (type) {
		case FormareType.MSZU:
			return ({number: random.int(1000, 9999), type: FormareType.MSZU})
		case FormareType.SZU:
			return ({number: random.int(100, 999), type: FormareType.SZU})
		case FormareType.ZU:
			return ({number: random.int(10, 99), type: FormareType.ZU})
		case FormareType.U:
			return ({number: random.int(1, 9), type: FormareType.U})
		default:
			break;
	}
	return {number: 0, type: FormareType.U};
}

export function Formare() {
	const difficulty = useDifficultyContext();
	const navigate = useNavigate();
	const progress = useProgressContext();
	const [verifColor, setVerifColor] = useState("primary");
	const [swap, setSwap] = useState(false);
	const [hasCheated, setHasCheated] = useState(false);
	const [tryAgainVisible, setTryAgainVisible] = useState(false);
	const [answer, setAnswer] = useState<FormareNumberType>();
	const [u, setU] = useState<number>(0);
	const [z, setZ] = useState<number | null>(null);
	const [s, setS] = useState<number | null>(null);
	const [m, setM] = useState<number | null>(null);


	useEffect(() => {
		setVerifColor("primary");
		setAnswer(generateFormareNumber(difficulty.value.formare.formationType));
		setHasCheated(false);
	}, []);

	return (
		<AnimatedPage>
			<div className="card-holder formare">
				<Modal open={tryAgainVisible} blur onClose={() => setTryAgainVisible(false)}>
					<Modal.Header><Warning2 color="#f31260"/></Modal.Header>
					<Modal.Body>
						<h4 style={{fontFamily: "DM Sans", textAlign: "center", fontWeight: "normal"}}>Ai fost
							aproape!</h4>
						<h5 style={{fontFamily: "DM Sans", textAlign: "center", fontWeight: "normal"}}>Mai
							incearca!</h5>
					</Modal.Body>
				</Modal>
				<div className="background-card">
					<Button light auto size='xs' icon={<ArrowLeft size="24"/>}
					        css={{width: "36px", height: "36px"}}
					        onPress={() => navigate(-1)}
					/>
					<h3 style={{
						textAlign: "center",
						fontFamily: "DM Sans", fontWeight: "normal", fontSize: "20px"
					}}>
						Formarea Numerelor
					</h3>
					{ swap &&
					<AnimatedPage>
						<div className="formare-card-holder">
							<Card css={{width: "70%", height: "390px"}}>
								<Card.Header css={{
									fontFamily: "DM Sans", borderBottom: "1px solid #ccc"
								}}>
									Reprezentaţi numărul afişat pe numărătoare
								</Card.Header>
								<Card.Body css={{
									fontFamily: "DM Sans",
									overflow: 'hidden'
								}}>
									<span style={{fontSize: "2rem", textAlign: 'center'}}>
										{answer?.number}
									</span>
									<div style={{
										display: 'flex',
										flexDirection: 'row',
										marginLeft: 'auto',
										marginRight: 'auto',
										marginTop: '5px'
									}}>
										{ (answer?.type ?? 0 )>= 3 &&
											<NumberLine
											label="M"
											value={m ?? 0}
											plusCallback={() => setM(m! + 1 >= 9 ? 9 : m! + 1)}
											minusCallback={() => setM(m! - 1 <= 0 ? 0 : m! - 1)}/>}
										{ (answer?.type ?? 0) >= 3 && <Spacer x={1}/>}
										{ (answer?.type ?? 0 )>= 2 &&
										<NumberLine
											label="S"
											value={s ?? 0}
											plusCallback={() => setS(s! + 1 >= 9 ? 9 : s! + 1)}
											minusCallback={() => setS(s! - 1 <= 0 ? 0 : s! - 1)}/>}
										{ (answer?.type ?? 0) >= 2 && <Spacer x={1}/>}
										{ (answer?.type ?? 0 )>= 1 && (
											<NumberLine
												label="Z"
												value={z ?? 0}
												plusCallback={() => setZ(z! + 1 >= 9 ? 9 : z! + 1)}
												minusCallback={() => setZ(z! - 1 <= 0 ? 0 : z! - 1)}/>)}
										{ (answer?.type ?? 0) >= 1 && <Spacer x={1}/>}
										{ (answer?.type ?? 0 )>= 1 && (
											<NumberLine
												label="U"
												value={u}
												plusCallback={() => setU(u! + 1 >= 9 ? 9 : u! + 1)}
												minusCallback={() => setU(u! - 1 <= 0 ? 0 : u! - 1)}/>)}
									</div>
								</Card.Body>
							</Card>

						</div>
					</AnimatedPage>
					}
					{ !swap &&
                        <AnimatedPage>
                            <div className="formare-card-holder">
                                <Card css={{width: "70%", height: "390px"}}>
                                    <Card.Header css={{
										fontFamily: "DM Sans", borderBottom: "1px solid #ccc"
									}}>
                                        Reprezentaţi numărul afişat pe numărătoare
                                    </Card.Header>
                                    <Card.Body css={{
										fontFamily: "DM Sans",
										overflow: 'hidden'
									}}>
									<span style={{fontSize: "2rem", textAlign: 'center'}}>
										{answer?.number}
									</span>
                                        <div style={{
											display: 'flex',
											flexDirection: 'row',
											marginLeft: 'auto',
											marginRight: 'auto',
											marginTop: '5px'
										}}>
											{ (answer?.type ?? 0 )>= 3 &&
                                                <NumberLine
                                                    label="M"
                                                    value={m ?? 0}
                                                    plusCallback={() => setM(m! + 1 >= 9 ? 9 : m! + 1)}
                                                    minusCallback={() => setM(m! - 1 <= 0 ? 0 : m! - 1)}/>}
											{ (answer?.type ?? 0) >= 3 && <Spacer x={1}/>}
											{ (answer?.type ?? 0 )>= 2 &&
                                                <NumberLine
                                                    label="S"
                                                    value={s ?? 0}
                                                    plusCallback={() => setS(s! + 1 >= 9 ? 9 : s! + 1)}
                                                    minusCallback={() => setS(s! - 1 <= 0 ? 0 : s! - 1)}/>}
											{ (answer?.type ?? 0) >= 2 && <Spacer x={1}/>}
											{ (answer?.type ?? 0 )>= 1 && (
												<NumberLine
													label="Z"
													value={z ?? 0}
													plusCallback={() => setZ(z! + 1 >= 9 ? 9 : z! + 1)}
													minusCallback={() => setZ(z! - 1 <= 0 ? 0 : z! - 1)}/>)}
											{ (answer?.type ?? 0) >= 1 && <Spacer x={1}/>}
											{ (answer?.type ?? 0 )>= 1 && (
												<NumberLine
													label="U"
													value={u}
													plusCallback={() => setU(u! + 1 >= 9 ? 9 : u! + 1)}
													minusCallback={() => setU(u! - 1 <= 0 ? 0 : u! - 1)}/>)}
                                        </div>
                                    </Card.Body>
                                </Card>

                            </div>
                        </AnimatedPage>
					}
					<div className="buttons-container">
						<Button size='lg' flat
							css={{ fontFamily: 'DM Sans' }}
						        onPress={() => {
									setHasCheated(false);
							        setAnswer(generateFormareNumber(difficulty.value.formare.formationType));
									setSwap(!swap);
									setM(null);
							        setS(null);
							        setZ(null);
							        setU(0);
								}}
						>Treci Peste</Button>
						<Spacer x={2}/>
						<Tooltip
							placement='top'
							shadow
							contentColor='warning'
							content={
							<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
								<Warning2 color='#f5a524' />
								<Spacer x={1} />
								<span>Nu vei mai primi puncte de progres pentru acest exercitiu.</span>
							</div>
						}>
							<Button size='lg' flat color='warning'
								css={{ fontFamily: 'DM Sans'}}
								onPress={() => {
									setHasCheated(true);

									setM((answer?.number === undefined ||
										 answer?.number === null) ? null
											: Math.floor(answer?.number / 1000))
									setS((answer?.number === undefined ||
										answer?.number === null) ? null
										: Math.floor(answer?.number / 100) % 10)
									setZ((answer?.number === undefined ||
										answer?.number === null) ? null
										: Math.floor(answer?.number / 10) % 10)
									setU((answer?.number === undefined ||
										answer?.number === null) ? 0
										: Math.floor(answer?.number) % 10)
								}}
							>
								Arată Răspunsul
							</Button>
						</Tooltip>
						<Spacer x={2}/>
						<Button size='lg' color={verifColor as NormalColors}
							css={{ fontFamily: 'DM Sans' }}
							onPress={() => {
								if ((m ?? 0) * 1000 + (s ?? 0) * 100 + (z ?? 0) * 10 + u === answer?.number) {
									setVerifColor('success');
									setTimeout(() => {
										setVerifColor('primary');
									}, 500);
									setM(null);
									setS(null);
									setZ(null);
									setU(0);
									setAnswer(generateFormareNumber(difficulty.value.formare.formationType));
									setSwap(!swap);
									console.log('correct');
									if (hasCheated) {
										setHasCheated(false);
									} else {
										let copy = { ...progress.value };
										let newProgress: ExerciseProgress =
											copy.level1.matematica.parts.get('aritmetica')
												?.parts.get('formare') ?? new ExerciseProgress(
												0, 0
											);
										// @ts-ignore
										newProgress.current += 1;

										copy.level1.matematica.parts.get('aritmetica')
											?.parts.set('formare', newProgress);

										let newManager: ProgressManager = new ProgressManager();
										newManager.level1 = copy.level1;
										newManager.level2 = copy.level2;
										newManager.level3 = copy.level3;
										progress.setValue(newManager);
									}
								} else {
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