import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import './level1.scss';
import { Text, Grid, Card, Button } from '@nextui-org/react';
import { GridLock } from 'iconsax-react';
import { ProgressSubjectCard } from '@/components/ProgressSubjectCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/all';
import { FunFactCard } from '@/components/FunFactCard';
import { useProgressContext, useDifficultyContext } from '../../services/context';
import { useState, useEffect } from 'react';
import { DifficultyManager, Order } from '@/services/DifficultyManager';
import { Operator } from '@/types/ExpressionTree';
import { FormareType } from '../../services/DifficultyManager';

function Level1() {
    const navigate = useNavigate();
    const progress = useProgressContext();
    const difficulty = useDifficultyContext();

    useEffect(() => {
        let newDifficulty = new DifficultyManager();

        newDifficulty.operatii.allowedOperators = [Operator.minus, Operator.plus, Operator.div];
        newDifficulty.operatii.lowLimit = 1;
        newDifficulty.operatii.maxLimit = 10;
        newDifficulty.operatii.depth = 3;

        newDifficulty.fractii.lowLimit = 2;
        newDifficulty.fractii.maxLimit = 10;
        newDifficulty.fractii.allowWholes = false;

        newDifficulty.ordine.allowedOrders = [Order.descending, Order.ascending];
        newDifficulty.ordine.length = 7;
        newDifficulty.ordine.lowLimit = 1;
        newDifficulty.ordine.maxLimit = 10;

        newDifficulty.formare.formationType = FormareType.ZU;

        difficulty.setValue(newDifficulty);
    }, []);

    return (
        <AnimatedPage>
            <div className="card-holder level1">
                <div className="background-card">
                    <h3 style={{textAlign: 'center', 
                    fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"}}>Materii</h3>
                    <Grid.Container gap={3}>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                to="/levels/1/aritmetica"
                                subject="Aritmetică"
                                current={progress.value.level1.matematica.parts.get('aritmetica')?.current() as number}
                                total={progress.value.level1.matematica.parts.get('aritmetica')?.total() as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                to="/levels/1/geometrie"
                                subject="Geometrie"
                                current={progress.value.level1.matematica.parts.get('geometrie')?.current() as number}
                                total={progress.value.level1.matematica.parts.get('geometrie')?.total() as number}
                            />
                        </Grid>
                        <Grid sm={12} justify='center'>
                            <ProgressSubjectCard 
                                to="/levels/1/romana"
                                subject="Limbă şi Comunicare"
                                current={progress.value.level1.comunicare.parts.get('romana')?.current() as number}
                                total={progress.value.level1.comunicare.parts.get('romana')?.total() as number}
                            />
                        </Grid>
                    </Grid.Container>
                
                    {/* <Button
                        /// TODO(wowvain-dev): simplify storage read/write access
                        // onPress={() => {
                        //     let copy = {...progress.value};
                        //     let newProgress: ExerciseProgress = 
                        //         copy.level1.matematica.parts.get('aritmetica')
                        //             ?.parts.get('operatii') ?? new ExerciseProgress(
                        //                 0, 0
                        //             );
                        //     // @ts-ignore
                        //     newProgress.current += 1;
                            
                        //     copy.level1.matematica.parts.get('aritmetica')
                        //         ?.parts.set('operatii', newProgress);

                        //     let newManager: ProgressManager = new ProgressManager();
                        //     newManager.level1 = copy.level1;
                        //     newManager.level2 = copy.level2;
                        //     newManager.level3 = copy.level3;
                        //     progress.setValue(newManager);
                        // }}
                    >Add Progress</Button> */}
                </div>

                <FunFactCard />
            </div>
        </AnimatedPage>
    );
}

export default Level1;