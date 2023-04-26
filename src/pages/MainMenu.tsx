import './MainMenu.scss';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import { Text, Grid, Card, Button } from '@nextui-org/react';
import { ProgressSubjectCard } from '@/components/ProgressSubjectCard';
import { FunFactCard } from '@/components/FunFactCard';
import { useProgressContext, useDifficultyContext } from '@/services/context';
import { useState, useEffect } from 'react';
import { DifficultyManager, Order, FormareType } from '@/services/DifficultyManager';
import { Operator } from '@/types/ExpressionTree';

function MainMenu() {
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
                    fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"}}>Module</h3>
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
                </div>
                <FunFactCard />
            </div>
        </AnimatedPage>
    );
}

export default MainMenu;