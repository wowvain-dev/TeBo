import './ordine.scss';
import { useDifficultyContext, useProgressContext } from "@/services/context";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { ArrowLeft, ArrowRight, Warning2 } from 'iconsax-react';
import { Button, Card, Modal, Spacer, Tooltip, NormalColors } from '@nextui-org/react';
import { Order } from '../../../../services/DifficultyManager';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '@/components/SortableItem';
import { ExerciseProgress, ProgressManager } from '@/services/ProgressManager';
import {TryAgainModal} from "@/components/TryAgainModal";
import ReactHowler from 'react-howler';
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import { Tour, TourProps } from 'antd';
import { HiOutlineSpeakerWave, AiOutlineQuestion } from 'react-icons/all';
import stick_llama from '@/assets/stick-LLAMA-nerd-yellow.png';

function generateArray(lowLimit: number, maxLimit: number, length: number): number[] {
    let array: number[] = [];

    while (array.length < length - 1) {
        var a = Math.floor(Math.random() * (maxLimit - lowLimit) + lowLimit);

        while (array.includes(a)) {
            a = Math.floor(Math.random() * (maxLimit - lowLimit) + lowLimit);
        }

        array.push(a);
    }

    return array;
}

function checkOrder(array: number[], orderToCheck: Order): boolean {
    if (orderToCheck === Order.ascending) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) return false;
        }
    } else if (orderToCheck === Order.descending) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < array[i + 1]) return false;
        }
    }

    return true;
}

function reorderArray(array: number[], order: Order): number[] {
    let isOrdered: boolean = false;
    if (order === Order.ascending) {
        while (!isOrdered) {
            isOrdered = true;
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    let aux = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = aux;
                    isOrdered = false;
                }
            }
        }
    } else {
        while (!isOrdered) {
            isOrdered = true;
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] < array[i + 1]) {
                    let aux = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = aux;
                    isOrdered = false;
                }
            }
        }

    }
    return array;
}

export function Ordine() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [items, setItems] = useState<number[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>(Order.ascending);
    const [tourVisible, setTourVisible] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    useEffect(() => {
        setVerifColor('primary');
        setHasCheated(false);
        setItems(generateArray(difficulty.value.ordine.lowLimit, difficulty.value.ordine.maxLimit,
            difficulty.value.ordine.length));
        setSelectedOrder(difficulty.value.ordine.allowedOrders[
            Math.floor(Math.random() * difficulty.value.ordine.allowedOrders.length)]);
    }, []);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setItems((items) => {
                const activeIndex = items.indexOf(active.id as number);
                const overIndex = items.indexOf(over?.id as number);

                return arrayMove(items, activeIndex, overIndex);
            });


        }
    };

    let orderRef = useRef(null);
    let rowRef = useRef(null);
    let skipRef = useRef(null);
    let cheatRef = useRef(null);
    let ansRef = useRef(null);

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                Verificaţi ordinea în care trebuie să ordonaţi şirul
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{flex: '1'}}></div>
                    <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                </div>
                </div>
            ),
            target: () => orderRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {}
        }, {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Trageţi de elementele şirului pentru a le pune în poziţiile corecte, respectând ordinea menţionată anterior
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center'}}>
                        <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                        <div style={{flex: '1'}}></div>
                        <img style={{scale: '150%', height: '100px', marginRight: '20px'}} src={stick_llama} alt='Llama ajutatoare'/>
                    </div>
                </div>
            ),
            target: () => rowRef.current,
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

    if (selectedOrder === Order.ascending) console.log("ascending"); else console.log("descending");
    return (
        <AnimatedPage>
            <ReactHowler src={success_sound} playing={successSound} onEnd={() => setSuccessSound(false)}/>
            <ReactHowler src={failure_sound} playing={failureSound} onEnd={() => setFailureSound(false)}/>
            <div className="card-holder ordine">
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
                        onPress={() => setTourVisible(true)}
                    />
                    </div>
                    <h3 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                    }}>
                        Ordine de Şiruri
                    </h3>
                    {swap && (
                        <AnimatedPage>
                            <div className="order-card-holder">
                                <Card
                                    css={{ width: '70%', height: '200px' }}
                                >
                                    <Card.Header ref={orderRef}
                                        css={{
                                            fontFamily: 'DM Sans',
                                            borderBottom: '1px solid #ccc'
                                        }}>Ordonaţi {selectedOrder === Order.ascending ? 'crescător' : 'descrescător'}
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
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div ref={rowRef} style={{display: 'flex', flexDirection: 'row'}}>
                                            <SortableContext 
                                                items={items}
                                                strategy={horizontalListSortingStrategy}
                                            >
                                                {items.map(id => <SortableItem key={id} id={id} />)}
                                            </SortableContext>
                                            </div>
                                        </DndContext>

                                    </Card.Body>
                                </Card>
                            </div>
                        </AnimatedPage>
                    )}
                    {!swap && (
                        <AnimatedPage>
                            <div className="order-card-holder">
                                <Card
                                    css={{ width: '70%', height: '200px' }}
                                >
                                    <Card.Header ref={orderRef}
                                        css={{
                                            fontFamily: 'DM Sans',
                                            borderBottom: '1px solid #ccc'
                                        }}>Ordonaţi {selectedOrder === Order.ascending ? 'crescător' : 'descrescător'}
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
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div ref={rowRef} style={{display: 'flex', flexDirection: 'row'}}>
                                            <SortableContext
                                                items={items}
                                                strategy={horizontalListSortingStrategy}>
                                                {items.map(id => <SortableItem key={id} id={id} />)}
                                            </SortableContext>
                                            </div>
                                        </DndContext>
                                    </Card.Body>
                                </Card>
                            </div>
                        </AnimatedPage>
                    )}
                    <div className="buttons-container">
                        <Button size='lg' flat ref={skipRef}
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setHasCheated(false);
                                setItems(generateArray(difficulty.value.ordine.lowLimit, difficulty.value.ordine.maxLimit,
                                    difficulty.value.ordine.length));
                                setSelectedOrder(difficulty.value.ordine.allowedOrders[
                                    Math.floor(Math.random() * difficulty.value.ordine.allowedOrders.length)]);
                                setSwap(!swap);
                            }}
                        >Treci Peste</Button>
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
                                    setItems(reorderArray(items, selectedOrder ?? Order.ascending));
                                }}
                            >Arată Răspunsul</Button>
                        </Tooltip>
                        <Spacer x={2} />
                        <Button size='lg' color={verifColor as NormalColors} ref={ansRef}
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                console.log(hasCheated);
                                if (checkOrder(items, selectedOrder ?? Order.ascending)) {
                                    setVerifColor('success');
                                    setTimeout(() => {
                                        setVerifColor('primary');
                                    }, 500);
                                    setItems(generateArray(difficulty.value.ordine.lowLimit, difficulty.value.ordine.maxLimit,
                                        difficulty.value.ordine.length));
                                    setSelectedOrder(difficulty.value.ordine.allowedOrders[
                                        Math.floor(Math.random() * difficulty.value.ordine.allowedOrders.length)]);
                                    setSwap(!swap);
                                    console.log('CORRECT');
                                    setSuccessSound(true);
                                    if (hasCheated) {
                                        setHasCheated(false);
                                    } else {
                                        let copy = { ...progress.value };
                                        let newProgress: ExerciseProgress =
                                            copy.level1.matematica.parts.get('aritmetica')
                                                ?.parts.get('siruri') ?? new ExerciseProgress(
                                                    0, 0
                                                );
                                        // @ts-ignore
                                        newProgress.current += 1;

                                        copy.level1.matematica.parts.get('aritmetica')
                                            ?.parts.set('siruri', newProgress);

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
                        >Verifică</Button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}