import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import './level1.scss';
import { Text, Grid } from '@nextui-org/react';
import { GridLock } from 'iconsax-react';
import { ProgressSubjectCard } from '@/components/ProgressSubjectCard';

function Level1() {
    const navigate = useNavigate();
    return (
        <AnimatedPage>
            <div className="card-holder level1">
                <div className="background-card">
                    <Grid.Container gap={5}>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                subject="Algebră"
                                progress={24}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressSubjectCard 
                                subject="Geometrie"
                                progress={74}
                            />
                        </Grid>
                        <Grid sm={12} justify='center'>
                            <ProgressSubjectCard 
                                subject="Limbă şi Comunicare"
                                progress={49}
                            />
                        </Grid>
                    </Grid.Container>
                </div>
            </div>
        </AnimatedPage>
    );
}

export default Level1;