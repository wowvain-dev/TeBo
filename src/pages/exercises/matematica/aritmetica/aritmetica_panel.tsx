import './aritmetica_panel.scss';
import {ProgressExerciseCard} from '@/components/ProgressExerciseCard';
import {Button, Grid} from '@nextui-org/react';
import AnimatedPage from '../../../../components/AnimatedPage';
import {useProgressContext} from '../../../../services/context';
import {useNavigate} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';
import {ExpressionNode, ExpressionTree, Operator} from '@/types/ExpressionTree';
import {Pagination} from '@nextui-org/react';
import {ArrowLeft} from 'iconsax-react';
import {useState} from "react";


export function AritmeticaPanel() {
    const progress = useProgressContext();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);


    return (
        <AnimatedPage>
            <div className="card-holder aritmetica-panel">
                <div className="background-card">
                    <Button light auto size='xs' icon={<ArrowLeft size="24"/>}
                            css={{width: "36px", height: "36px"}}
                            onPress={() => navigate(-1)}
                    />

                    <h3 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                    }}>Exerciţii</h3>
                    {page === 1 &&
                        <AnimatedPage>
                            <Grid.Container gap={3}>
                                <Grid sm={6} justify='center'>
                                    <ProgressExerciseCard
                                        to='/levels/1/aritmetica/operatii'
                                        exercise="Operaţii"
                                        current={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('operatii')?.current as number}
                                        total={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('operatii')?.total as number}
                                    />
                                </Grid>
                                <Grid sm={6} justify='center'>
                                    <ProgressExerciseCard
                                        to='/levels/1/aritmetica/fractii'
                                        exercise="Fracţii"
                                        current={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('fractii')?.current as number}
                                        total={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('fractii')?.total as number}
                                    />
                                </Grid>
                                <Grid sm={6} justify='center'>
                                    <ProgressExerciseCard
                                        to='/levels/1/aritmetica/ordine'
                                        exercise="Şiruri de numere"
                                        current={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('siruri')?.current as number}
                                        total={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('siruri')?.total as number}
                                    />
                                </Grid>
                                <Grid sm={6} justify='center'>
                                    <ProgressExerciseCard
                                        to='/levels/1/aritmetica/formare'
                                        exercise="Formarea Numerelor"
                                        current={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('formare')?.current as number}
                                        total={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('formare')?.total as number}
                                    />
                                </Grid>
                            </Grid.Container>
                        </AnimatedPage>
                    }
                    {page === 2 &&
                        <AnimatedPage>
                            <Grid.Container gap={3}>
                                <Grid sm={6} justify='center'>
                                    <ProgressExerciseCard
                                        to='/levels/1/aritmetica/comparatii'
                                        exercise="Comparatii"
                                        current={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('comparatii')?.current as number}
                                        total={progress.value.level1.matematica.parts
                                            .get('aritmetica')?.parts.get('comparatii')?.total as number}
                                    />
                                </Grid>
                            </Grid.Container>
                        </AnimatedPage>
                    }

                    <div style={{width: '100%', display: 'flex', marginBottom: '10px', marginTop: '30px'}}>
                        <Pagination style={{marginLeft: 'auto', marginRight: 'auto'}}
                                    color='primary'
                                    onChange={(page) => {
                                        setPage(page)
                                    }}
                                    page={page} total={2}/>
                    </div>
                </div>
            </div>
        </AnimatedPage>);
}