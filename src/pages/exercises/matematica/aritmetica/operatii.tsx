import './operatii.scss';
import AnimatedPage from '@/components/AnimatedPage';
import { Button, Card, Input, NormalColors, Spacer, Modal, Tooltip } from '@nextui-org/react';
import { ArrowLeft, CloseCircle, Warning2 } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { ExpressionTree } from '@/types/ExpressionTree';
import { useEffect, useState } from 'react';
import { useProgressContext, useDifficultyContext } from '../../../../services/context';
import { ExerciseProgress, ProgressManager } from '@/services/ProgressManager';
import { notification } from "antd";

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

    useEffect(() => {
        setVerifColor('primary');
        setTree(ExpressionTree.random(
            difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
            difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
        ));
        setHasCheated(false);
    }, []);

    console.log(tree.root?.infix());

    return (
        <AnimatedPage>
            <div className="card-holder operatii">
                <Modal open={tryAgainVisible} blur onClose={() => setTryAgainVisible(false)}>
                    <Modal.Header>
                        <Warning2 color='#f31260'/>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 style={{fontFamily: 'DM Sans', textAlign: 'center', fontWeight: 'normal'}}>Ai fost aproape!</h4>
                        <h5 style={{fontFamily: 'DM Sans', textAlign: 'center', fontWeight: 'normal'}}>Mai incearca!</h5>
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
                                        <span style={{ fontSize: '2rem' }}>
                                            {tree.expression}=
                                        </span>
                                        <Input
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
                                        <span style={{ fontSize: '2rem' }}>
                                            {tree.expression}=
                                        </span>
                                        <Input
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
                        <Button size='sm' flat
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setInputValue('');
                                setTree(ExpressionTree.random(
                                    difficulty.value.operatii.allowedOperators, difficulty.value.ordine.lowLimit,
                                    difficulty.value.ordine.maxLimit, difficulty.value.operatii.depth
                                ));
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
                        <Button size='sm' flat color="warning"
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                setHasCheated(true);
                                setInputValue(ExpressionTree.evaluate(tree.root).toString());
                            }}
                        >Arată Răspunsul</Button>
                        </Tooltip>
                        <Spacer x={2} />
                        <Button size='sm' color={verifColor as NormalColors}
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
                                    }
                                } else {
                                    console.log('INCORRECT');
                                    // WrongAnswerNotification();
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