import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import './level1.scss';
import { Text, Grid, Card, Button } from '@nextui-org/react';
import { GridLock } from 'iconsax-react';
import { ProgressSubjectCard } from '@/components/ProgressSubjectCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/all';
import { FunFactCard } from '@/components/FunFactCard';
import { ExerciseProgress, ProgressManager, useProgressContext } from '../../helpers/context';

function Level1() {
    const navigate = useNavigate();
    const progress = useProgressContext();

    return (
        <AnimatedPage>
            <div className="card-holder level1">
                <div className="background-card">
                    <Grid.Container gap={3}>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                subject="Aritmetică"
                                current={progress.value.level1.matematica.parts.get('aritmetica')?.current() as number}
                                total={progress.value.level1.matematica.parts.get('aritmetica')?.total() as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                subject="Geometrie"
                                current={progress.value.level1.matematica.parts.get('geometrie')?.current() as number}
                                total={progress.value.level1.matematica.parts.get('geometrie')?.total() as number}
                            />
                        </Grid>
                        <Grid sm={12} justify='center'>
                            <ProgressSubjectCard 
                                subject="Limbă şi Comunicare"
                                current={progress.value.level1.comunicare.parts.get('romana')?.current() as number}
                                total={progress.value.level1.comunicare.parts.get('romana')?.total() as number}
                            />
                        </Grid>
                    </Grid.Container>
                
                    <Button
                        /// TODO(wowvain-dev): simplify storage read/write access
                        onPress={() => {
                            let copy = {...progress.value};
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
                        }}
                    >Add Progress</Button>
                </div>

                <FunFactCard />
            </div>
        </AnimatedPage>
    );
}

export default Level1;