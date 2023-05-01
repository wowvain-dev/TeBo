import './MainMenu.scss';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { Text, Grid, Card, Button } from '@nextui-org/react';
import { ProgressSubjectCard } from '../components/ProgressSubjectCard';
import { FunFactCard } from '../components/FunFactCard';
import { useProgressContext, useDifficultyContext } from '../services/context';
import { useState, useEffect } from 'react';
import { DifficultyManager, Order, FormareType } from '../services/DifficultyManager';
import { Operator } from '../types/ExpressionTree';

function MainMenu() {
    const navigate = useNavigate();
    const progress = useProgressContext();
    const difficulty = useDifficultyContext();

    useEffect(() => {
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
                                to="/aritmetica"
                                subject="Aritmetică"
                                current={progress.value.level1.matematica.parts.get('aritmetica')?.current() as number}
                                total={progress.value.level1.matematica.parts.get('aritmetica')?.total() as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                to="/geometrie"
                                subject="Geometrie"
                                current={progress.value.level1.matematica.parts.get('geometrie')?.current() as number}
                                total={progress.value.level1.matematica.parts.get('geometrie')?.total() as number}
                            />
                        </Grid>
                        <Grid sm={12} justify='center'>
                            <ProgressSubjectCard 
                                to="/romana"
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