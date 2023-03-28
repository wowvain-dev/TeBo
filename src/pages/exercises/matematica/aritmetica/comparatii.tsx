import './comparatii.sass';
import AnimatedPage from '@/components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, CloseCircle, Warning2} from 'iconsax-react';
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import React, {useEffect, useState} from 'react';
import {useProgressContext, useDifficultyContext} from '../../../../services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {DndContext, DragEndEvent, useDraggable, useDroppable} from "@dnd-kit/core";

export type DroppableProps = {
    label: React.ReactNode
};

export type DraggableProps = {
    label: React.ReactNode
};

function Droppable({label}: DroppableProps) {
    const {setNodeRef} = useDroppable({
        id: 'droppable', data: {accepts: ['sign']}
    });

    return <div>
        {label}
    </div>
}

function Draggable({label}: DraggableProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable', data: {type: 'sign'}
    });

    return <div>
        {label}
    </div>
}

export function Comparatii() {
    const difficulty = useDifficultyContext();
    const navigate = useNavigate();
    const progress = useProgressContext();
    const [verifColor, setVerifColor] = useState('primary');
    const [tree1, setTree1] = useState(new ExpressionTree());
    const [tree2, setTree2] = useState(new ExpressionTree());
    const [inputValue, setInputValue] = useState('');
    const [swap, setSwap] = useState(false);
    const [hasCheated, setHasCheated] = useState(false);
    const [tryAgainVisible, setTryAgainVisible] = useState(false);

    useEffect(() => {
        setVerifColor('primary');
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

    }

    return (
        <AnimatedPage>
            <div className="card-holder comparatii">
                <Modal open={tryAgainVisible} blur onClose={() => setTryAgainVisible(false)}>
                    <Modal.Header>
                        <Warning2 color='#f31260'/>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 style={{fontFamily: 'DM Sans', textAlign: 'center', fontWeight: 'normal'}}>Ai fost
                            aproape!</h4>
                        <h5 style={{fontFamily: 'DM Sans', textAlign: 'center', fontWeight: 'normal'}}>Mai
                            incearca!</h5>
                    </Modal.Body>
                </Modal>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="background-card">
                        <Button light auto size='xs' icon={<ArrowLeft size="24"/>}
                                css={{width: "36px", height: "36px"}}
                                onPress={() => navigate(-1)}
                        />
                        <h3 style={{
                            textAlign: 'center',
                            fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                        }}>
                            Comparatii
                        </h3>
                        <AnimatedPage>
                            <div className="comparison-card-holder">
                                <Card css={{width: '70%', height: '200px'}}>
                                    <Card.Header
                                        css={{
                                            fontFamily: 'DM Sans',
                                            borderBottom: '1px solid #ccc'
                                        }}>
                                        Alegeti semnul de comparare potrivit
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
                                        <span style={{fontSize: '2rem', flex: '1'}}>{tree1.expression}</span>
                                        <Spacer x={2}/>
                                        <span style={{fontSize: '2rem', flex: '1'}}>{tree2.expression}</span>
                                    </Card.Body>
                                </Card>
                            </div>
                        </AnimatedPage>
                        <div className='buttons-container'>
                            <Button size='lg' flat
                                    css={{fontFamily: 'DM Sans'}}
                                    onPress={() => {
                                    }
                                    }
                            >
                                Treci Peste
                            </Button>
                        </div>
                    </div>

                </DndContext>
            </div>
        </AnimatedPage>
    );
}