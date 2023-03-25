import './ordine.scss';
import { useDifficultyContext, useProgressContext } from "@/services/context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { ArrowLeft, Warning2 } from 'iconsax-react';
import { Button, Card, Modal } from "@nextui-org/react";
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

export function Ordine() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);
    const [items, setItems] = useState<number[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    useEffect(() => {
        setVerifColor('primar');
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

    return (
        <AnimatedPage>
            <div className="card-holder ordine">
                <Modal open={tryAgainVisible} blur onClose={() => setTryAgainVisible(false)}>
                    <Modal.Header>
                        <Warning2 color='#f31260' />
                    </Modal.Header>
                    <Modal.Body>
                        <h4 style={{ fontFamily: 'DM Sans', textAlign: 'center', fontWeight: 'normal' }}>Ai fost aproape!</h4>
                        <h5 style={{ fontFamily: 'DM Sans', textAlign: 'center', fontWeight: 'normal' }}>Mai incearca!</h5>
                    </Modal.Body>
                </Modal>
                <div className="background-card">
                    <Button light auto size='xs' icon={<ArrowLeft size="24" />}
                        css={{ width: "36px", height: "36px" }}
                        onPress={() => navigate(-1)}
                    />
                    <h3 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                    }}>
                        Operaţii
                    </h3>
                    {swap && (
                        <AnimatedPage>
                            <div className="order-card-holder">
                                <Card
                                    css={{ width: '70%', height: '200px' }}
                                >
                                    <Card.Header
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
                                            <SortableContext
                                                items={items}
                                                strategy={horizontalListSortingStrategy}

                                            >
                                                {items.map(id => <SortableItem key={id} id={id} />)}
                                            </SortableContext>
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
                                    <Card.Header
                                        css={{
                                            fontFamily: 'DM Sans',
                                            borderBottom: '1px solid #ccc'
                                        }}>Ordonaţi crescător
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
                                            <SortableContext
                                                items={items}
                                                strategy={horizontalListSortingStrategy}

                                            >
                                                {items.map(id => <SortableItem key={id} id={id} />)}
                                            </SortableContext>
                                        </DndContext>
                                    </Card.Body>
                                </Card>
                            </div>
                        </AnimatedPage>
                    )}
                    <div className="buttons-container">
                        <Button size='sm' flat
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setItems(generateArray(difficulty.value.ordine.lowLimit, difficulty.value.ordine.maxLimit,
                                    difficulty.value.ordine.length));
                                setSelectedOrder(difficulty.value.ordine.allowedOrders[
                                    Math.floor(Math.random() * difficulty.value.ordine.allowedOrders.length)]);
                                setSwap(!swap);
                            }}
                        >Treci Peste</Button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}