import './fractii.sass';
import { useDifficultyContext, useProgressContext } from '../../../../services/context';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { Button, Card, Input, Modal, NormalColors, Spacer, Tooltip } from '@nextui-org/react';
import { ArrowLeft, Warning2 } from 'iconsax-react';
import { Divider } from 'antd';
import Fraction from 'fraction.js';
import random from 'random';
import { FractionCanvas } from '@/components/FractionCanvas';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { ProgressManager, ExerciseProgress } from '@/services/ProgressManager';

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
    const [a, setA] = useState<string>('');
    const [b, setB] = useState<string>('');
    const [fraction, setFraction] = useState<Fractie>();

    useEffect(() => {
        setVerifColor('primary');
        setHasCheated(false);
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
    }, []);

    return (
        <AnimatedPage>
            <div className="card-holder fractii">
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
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: '20px'
                    }}>
                        Fracţii
                    </h3>
                    <AnimatedPage>
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
                                        <div className="canvas-container">
                                            {/* <canvas></canvas>
                                            lmao */}
                                            <FractionCanvas nominator={fraction?.numitor ?? 0} denominator={fraction?.numarator ?? 0} />
                                        </div>
                                        <Divider type="vertical" style={{ height: '100%' }} />
                                        <div className="fraction-container">
                                            <div className="fraction-input">
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
                    <div className="buttons-container">
                        <Button size='sm' flat
                            css={{ fontFamily: 'DM Sans' }}
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
                            <Button size='sm' flat color="warning"
                                css={{ fontFamily: 'DM Sans' }}
                                onPress={() => {
                                    setHasCheated(true);
                                    console.log(`correct: ${new Fraction(`${fraction?.numitor ?? 0}/${fraction?.numarator ?? 0}`)}`);
                                    console.log(`input: ${new Fraction(`${parseInt(a) ?? 0}/${parseInt(b) ?? 0}`)}`);
                                    setA(fraction?.numitor.toString() ?? '');
                                    setB(fraction?.numarator.toString() ?? '');
                                }}
                            >Arată Răspunsul</Button>
                        </Tooltip>
                        <Spacer x={2} />
                        <Button size='sm' color={verifColor as NormalColors}
                            css={{ fontFamily: 'DM Sans' }}
                            onPress={() => {
                                console.log(`correct: ${new Fraction(`${fraction?.numitor ?? 0}/${fraction?.numarator ?? 0}`)}`);
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