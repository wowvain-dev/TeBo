import "./comparatii.sass";
import error_llama from '../../../../assets/LLAMA-cool-purple.png';
import AnimatedPage from "@/components/AnimatedPage";
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from "@nextui-org/react";
import {Add, ArrowLeft, ArrowRight, CloseCircle, Minus, Warning2} from "iconsax-react";
import {useNavigate} from "react-router-dom";
import {ExpressionTree} from "@/types/ExpressionTree";
import React, {RefObject, useEffect, useRef, useState} from "react";
import {useProgressContext, useDifficultyContext} from "../../../../services/context";
import {ExerciseProgress, ProgressManager} from "@/services/ProgressManager";
import {DndContext, DragEndEvent, useDraggable, useDroppable, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {
	CgClose,
	CgMathDivide,
	CgMathMinus,
	CgMathPlus, HiOutlineSpeakerWave, TbEqual,
	TbMathEqualGreater, TbMathEqualLower,
	TbMathGreater,
	TbMathLower
} from "react-icons/all";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;
import {TryAgainModal} from "@/components/TryAgainModal";
import ReactHowler from 'react-howler';
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import { Tour, TourProps } from 'antd';
import stick_llama from '@/assets/stick-LLAMA-nerd-yellow.png';
import { AiOutlineQuestion } from 'react-icons/all';

export type DroppableProps = {
	label: React.ReactNode,
	children: React.ReactNode | null
};

export type DraggableProps = {
	label: React.ReactNode,
	id: number
};

const Droppable = React.forwardRef(({label, children}: DroppableProps, ref) => {
	const {setNodeRef} = useDroppable({
		id: `droppable`, data: {accepts: ["sign"]}
	});


	return (<div ref={setNodeRef}>
		{/*@ts-ignore*/}
		<div ref={ref} className="droppable">
			{children}
		</div>
	</div>);
});

function Draggable({label, id}: DraggableProps) {
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: id, data: {type: "sign"}
	});

	const style = {
		transform: CSS.Translate.toString(transform)
	};

	return <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable">
		{label}
	</div>;
}

export function Comparatii() {
	const difficulty = useDifficultyContext();
	const navigate = useNavigate();
	const progress = useProgressContext();
	const [verifColor, setVerifColor] = useState("primary");
	const [tree1, setTree1] = useState(new ExpressionTree());
	const [tree2, setTree2] = useState(new ExpressionTree());
	const [swap, setSwap] = useState(false);
	const [hasCheated, setHasCheated] = useState(false);
	const [tryAgainVisible, setTryAgainVisible] = useState(false);
	const [activeId, setActiveId] = useState<number | null>(null);

	const dropContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setVerifColor("primary");
		setTree1(ExpressionTree.random(
			difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
			difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
		));
		setTree2(ExpressionTree.random(
			difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
			difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
		));
		setHasCheated(false);
	}, []);

	console.log(tree1.root?.infix());
	console.log(tree2.root?.infix());

	const handleDragEnd = (event: DragEndEvent) => {
		const {active, over} = event;

		if (dropContainerRef === null) return;
		// @ts-ignore
		dropContainerRef.current.className = "droppable";
		// setActiveId(over === null ? active : over.id as number);
		if (over) {
			setActiveId(active.id as number);
		}
		console.log(activeId);
	};

	const handleDragStart = (event: DragStartEvent) => {
		// const {active, over} = event;

		// setActiveId(event.active.id?.toString());
		if (dropContainerRef === null) return;
		// @ts-ignore
		dropContainerRef.current.className = "droppable-active";
	};

	const [tourVisible, setTourVisible] = useState(false);
	const [successSound, setSuccessSound] = useState(false);
	const [failureSound, setFailureSound] = useState(false);

	let leftRef = useRef(null);
	let rightRef = useRef(null);
	let signRef = useRef(null);
	let signsRef = useRef(null);
	let skipRef = useRef(null);
	let cheatRef = useRef(null);
	let ansRef = useRef(null);

	const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                Calculează expresia din partea stângă
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{flex: '1'}}></div>
                    <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                </div>
                </div>
            ),
            target: () => leftRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {}
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                	Calculează expresia din partea dreaptă
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => rightRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
					După ce comparaţi cele doua expresii, trageţi semnul corespunzător între acestea
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => signsRef.current,
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
			<ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
			<ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
			<div className="card-holder comparatii">
				<Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={tourSteps}/>
				<TryAgainModal show={tryAgainVisible} setShow={setTryAgainVisible} />
				<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
					<div className="background-card">
						<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<Button light auto size="xs" icon={<ArrowLeft size="24"/>}
						        css={{width: "36px", height: "36px"}}
						        onPress={() => navigate(-1)}
						/>
						<Button light auto size="xs" icon={<AiOutlineQuestion size="24"/>}
						        css={{width: "36px", height: "36px"}}
						        onPress={() => setTourVisible(true)}
						/>
						</div>
						<h3 style={{
							textAlign: "center",
							fontFamily: "DM Sans", fontWeight: "normal", fontSize: "20px"
						}}>
							Comparaţii
						</h3>
						{swap &&
                            <AnimatedPage>
                                <div className="comparison-card-holder">
                                    <Card css={{width: "70%", height: "200px"}}>
                                        <Card.Header
                                            css={{
												fontFamily: "DM Sans",
												borderBottom: "1px solid #ccc"
											}}>
                                            Alegeti semnul de comparare potrivit
                                        </Card.Header>
                                        <Card.Body css={{
											fontFamily: "DM Sans",
											justifyContent: "center",
											textAlign: "center",
											display: "flex",
											flexDirection: "row",
											justifyCenter: "center",
											alignItems: "center"
										}}>
                                            <span ref={leftRef} style={{fontSize: "2rem", flex: "1"}}>{tree1.expression}</span>
                                            <Spacer x={2}/>
											{/*<Droppable label='?' />*/}
                                            <Droppable label={"?"} ref={dropContainerRef}>
												{
													activeId === 1 ? <TbMathLower size={25}/>
														: activeId === 2 ? <TbEqual size={25}/>
															: activeId === 3 ? <TbMathGreater size={25}/> : null
												}
                                            </Droppable>
                                            <Spacer x={2}/>
                                            <span ref={rightRef} style={{fontSize: "2rem", flex: "1"}}>{tree2.expression}</span>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </AnimatedPage>
						}
						{!swap &&
                            <AnimatedPage>
                                <div className="comparison-card-holder">
                                    <Card css={{width: "70%", height: "200px"}}>
                                        <Card.Header
                                            css={{
												fontFamily: "DM Sans",
												borderBottom: "1px solid #ccc"
											}}>
                                            Alegeti semnul de comparare potrivit
                                        </Card.Header>
                                        <Card.Body css={{
											fontFamily: "DM Sans",
											justifyContent: "center",
											textAlign: "center",
											display: "flex",
											flexDirection: "row",
											justifyCenter: "center",
											alignItems: "center"
										}}>
                                            <span ref={leftRef} style={{fontSize: "2rem", flex: "1"}}>{tree1.expression}</span>
                                            <Spacer x={2}/>
											{/*<Droppable label='?' />*/}
                                            <Droppable label={"?"} ref={dropContainerRef}>
												{
													activeId === 1 ? <TbMathLower size={25}/>
														: activeId === 2 ? <TbEqual size={25}/>
															: activeId === 3 ? <TbMathGreater size={25}/> : null
												}
                                            </Droppable>
                                            <Spacer x={2}/>
                                            <span ref={rightRef} style={{fontSize: "2rem", flex: "1"}}>{tree2.expression}</span>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </AnimatedPage>

						}
						<div className="draggable-list" ref={signsRef}>
							{activeId !== 1 ? <Draggable id={1} label={<TbMathLower size={25}/>}/> : null}
							{activeId !== 1 ? <Spacer x={1}/> : null}
							{activeId !== 2 ? <Draggable id={2} label={<TbEqual size={25}/>}/> : null}
							{activeId !== 3 ? <Spacer x={1}/> : null}
							{activeId !== 3 ? <Draggable id={3} label={<TbMathGreater size={25}/>}/> : null}
						</div>
						<div className="buttons-container">
							<Button size="lg" flat ref={skipRef}
							        css={{fontFamily: "DM Sans"}}
							        onPress={() => {
								        setHasCheated(false);
								        setActiveId(null);
								        setTree1(ExpressionTree.random(
									        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
									        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
								        setTree2(ExpressionTree.random(
									        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
									        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
								        setSwap(!swap);
							        }}
							>
								Treci Peste
							</Button>
							<Spacer x={2}/>
							<Tooltip contentColor="warning"
							         placement="top"
							         shadow
							         content={
								         <div style={{
									         display: "flex",
									         flexDirection: "row",
									         justifyContent: "center",
									         alignItems: "center"
								         }}>
									         <Warning2 color="#f5a524"/>
									         <Spacer x={1}/>
									         <span>Nu vei mai primi puncte de progres pentru acest exercitiu.</span>
								         </div>
							         }>
								<Button size="lg" flat color="warning" ref={cheatRef}
								        css={{fontFamily: "DM Sans "}}
								        onPress={() => {
									        setHasCheated(true);
									        let a = ExpressionTree.evaluate(tree1.root);
									        let b = ExpressionTree.evaluate(tree2.root);
									        if (a < b) setActiveId(1);
									        if (a === b) setActiveId(2);
									        if (a > b) setActiveId(3);
								        }}
								>
									Arată Răspunsul
								</Button>
							</Tooltip>
							<Spacer x={2}/>
							<Button size="lg" color={verifColor as NormalColors} ref={ansRef}
							        css={{fontFamily: "DM Sans"}}
							        onPress={() => {
								        let a = ExpressionTree.evaluate(tree1.root);
								        let b = ExpressionTree.evaluate(tree2.root);
								        if (a < b && activeId === 1) {
									        setVerifColor("success");
									        setTimeout(() => {
										        setVerifColor("primary");
									        }, 500);
									        setTree1(ExpressionTree.random(
										        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
										        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
									        setTree2(ExpressionTree.random(
										        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
										        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
									        setSwap(!swap);
									        console.log("correct");
									        setSuccessSound(true);
											setActiveId(null);
									        if (hasCheated) {
										        setHasCheated(false);
									        } else {
										        let copy = {...progress.value};
										        let newProgress: ExerciseProgress =
											        copy.level1.matematica.parts.get("aritmetica")
												        ?.parts.get("comparatii") ?? new ExerciseProgress(
												        0, 0
											        );
										        // @ts-ignore
										        newProgress.current += 1;

										        copy.level1.matematica.parts.get("aritmetica")
											        ?.parts.set("comparatii", newProgress);

										        let newManager: ProgressManager = new ProgressManager();
										        newManager.level1 = copy.level1;
										        newManager.level2 = copy.level2;
										        newManager.level3 = copy.level3;
										        progress.setValue(newManager);
									        }
									        return;
								        }
								        if (a === b && activeId === 2) {
									        setVerifColor("success");
									        setTimeout(() => {
										        setVerifColor("primary");
									        }, 500);
									        setTree1(ExpressionTree.random(
										        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
										        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
									        setTree2(ExpressionTree.random(
										        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
										        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
									        setSwap(!swap);
									        setSuccessSound(true);
									        console.log("correct");
									        setActiveId(null);
									        if (hasCheated) {
										        setHasCheated(false);
									        } else {
										        let copy = {...progress.value};
										        let newProgress: ExerciseProgress =
											        copy.level1.matematica.parts.get("aritmetica")
												        ?.parts.get("comparatii") ?? new ExerciseProgress(
												        0, 0
											        );
										        // @ts-ignore
										        newProgress.current += 1;

										        copy.level1.matematica.parts.get("aritmetica")
											        ?.parts.set("comparatii", newProgress);

										        let newManager: ProgressManager = new ProgressManager();
										        newManager.level1 = copy.level1;
										        newManager.level2 = copy.level2;
										        newManager.level3 = copy.level3;
										        progress.setValue(newManager);
									        }
									        return;
								        }
								        if (a > b && activeId === 3) {
									        setVerifColor("success");
									        setTimeout(() => {
										        setVerifColor("primary");
									        }, 500);
									        setTree1(ExpressionTree.random(
										        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
										        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
									        setTree2(ExpressionTree.random(
										        difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
										        difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth));
									        setSwap(!swap);
									        setSuccessSound(true);
									        console.log("correct");
									        setActiveId(null);
									        if (hasCheated) {
										        setHasCheated(false);
									        } else {
										        let copy = {...progress.value};
										        let newProgress: ExerciseProgress =
											        copy.level1.matematica.parts.get("aritmetica")
												        ?.parts.get("comparatii") ?? new ExerciseProgress(
												        0, 0
											        );
										        // @ts-ignore
										        newProgress.current += 1;

										        copy.level1.matematica.parts.get("aritmetica")
											        ?.parts.set("comparatii", newProgress);

										        let newManager: ProgressManager = new ProgressManager();
										        newManager.level1 = copy.level1;
										        newManager.level2 = copy.level2;
										        newManager.level3 = copy.level3;
										        progress.setValue(newManager);
									        }
									        return;
								        }
										setFailureSound(true);
								        console.log("INCORRECT");
								        setTryAgainVisible(true);
								        setTimeout(() => {
									        setTryAgainVisible(false);
								        }, 1500);
								        setVerifColor("error");
								        setTimeout(() => {
									        setVerifColor("primary");
								        }, 500);
							        }}
							>Verifică</Button>
						</div>
					</div>

				</DndContext>
			</div>
		</AnimatedPage>
	);
}