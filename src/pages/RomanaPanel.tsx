import './RomanaPanel.sass';
import {ProgressExerciseCard} from '@/components/ProgressExerciseCard';
import {Button, Grid} from '@nextui-org/react';
import AnimatedPage from '../components/AnimatedPage';
import {useProgressContext} from "@/services/context";
import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'iconsax-react';

export function RomanaPanel() {
    const progress = useProgressContext();
    const navigate = useNavigate();

    return (
        <AnimatedPage>
            <div className="card-holder romana-panel">
                <div className='background-card'>
                    <Button light size='xs' auto icon={<ArrowLeft size="24"/>}
                            css={{width: '36px', height: '36px'}}
                            onPress={() => navigate(-1)}
                    />

                    <h3 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                    }}>Exerciţii Română</h3>

                    <Grid.Container gap={3}>
                        <Grid sm={6} justify='center'>
                            <ProgressExerciseCard level={1}
                                                  to='/romana/litere'
                                                  exercise='Recunoaşterea Literelor'
                                                  current={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('litere')?.current as number}
                                                  total={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('litere')?.total as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressExerciseCard level={2}
                                                  to='/romana/vocale'
                                                  exercise='Vocale şi Consoane'
                                                  current={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('vocale')?.current as number}
                                                  total={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('vocale')?.total as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressExerciseCard level={2}
                                                  to='/romana/adevar'
                                                  exercise='Recunoaștere Propoziții'
                                                  current={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('adevar')?.current as number}
                                                  total={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('adevar')?.total as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressExerciseCard level={3}
                                                  to='/romana/paragraf'
                                                  exercise='Completarea Paragrafelor'
                                                  current={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('paragraf')?.current as number}
                                                  total={progress.value.level1.comunicare
                                                      .parts.get('romana')?.parts.get('paragraf')?.total as number}
                            />
                        </Grid>
                    </Grid.Container>
                </div>
            </div>
        </AnimatedPage>
    );
}
