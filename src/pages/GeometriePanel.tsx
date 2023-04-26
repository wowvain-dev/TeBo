import './geometrie_panel.sass';
import {ProgressExerciseCard} from '../components/ProgressExerciseCard';
import {Button, Grid} from '@nextui-org/react';
import AnimatedPage from '../components/AnimatedPage';
import {useProgressContext} from '../services/context';
import {useNavigate} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';
import {ExpressionNode, ExpressionTree, Operator} from '../types/ExpressionTree';
import {Pagination} from '@nextui-org/react';
import {ArrowLeft} from 'iconsax-react';
import {useState} from "react";
import React from 'react';

export function GeometriePanel() {
    const progress = useProgressContext();
    const navigate = useNavigate();

    return (
        <AnimatedPage>
            <div className="card-holder geometrie-panel">
                <div className='background-card'>

                <Button light auto icon={<ArrowLeft size="24"/>} 
                    css={{width: '36px', height: '36px'}}
                    onPress={() => navigate(-1)}
                />

                <h3 style={{
                    textAlign: 'center',
                    fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: "20px"
                }}>Exerciţii Geometrie</h3>

                <Grid.Container gap={3}>
                    <Grid sm={6} justify='center'>
                        <ProgressExerciseCard level={1} color='purple' type='cool'
                            to='/geometrie/culori'
                            exercise='Recunoaşterea Culorilor'
                            current={progress.value.level1.matematica
                                .parts.get('geometrie')?.parts.get('culori')?.current as number}
                            total={progress.value.level1.matematica
                                .parts.get('geometrie')?.parts.get('culori')?.total as number}
                        />
                    </Grid>
                    <Grid sm={6} justify='center'>
                        <ProgressExerciseCard level={2} color='purple' type='cool'
                            disabled
                            to='/geometrie/regula_sirului'
                            exercise='Regula Şirului de Forme'
                            current={progress.value.level1.matematica
                                .parts.get('geometrie')?.parts.get('regula_sirului')?.current as number}
                            total={progress.value.level1.matematica
                                .parts.get('geometrie')?.parts.get('regula_sirului')?.total as number}
                        />
                    </Grid>
                    <Grid sm={6} justify='center'>
                        <ProgressExerciseCard level={1} color='purple' type='cool'
                            disabled
                            to='/geometrie/comparare'
                            exercise='Comparare Figuri'
                            current={progress.value.level1.matematica
                                .parts.get('geometrie')?.parts.get('regula_sirului')?.current as number}
                            total={progress.value.level1.matematica
                                .parts.get('geometrie')?.parts.get('regula_sirului')?.total as number}
                        />
                    </Grid>
                </Grid.Container>
                </div>
            </div>
        </AnimatedPage>
    );
}