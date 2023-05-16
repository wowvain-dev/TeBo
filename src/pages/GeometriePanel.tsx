import './GemoetriePanel.sass';
import {ProgressExerciseCard} from '../components/ProgressExerciseCard';
import {Button, Grid} from '@nextui-org/react';
import AnimatedPage from '../components/AnimatedPage';
import {useProgressContext, useSettingsContext} from '../services/context';
import {useNavigate} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';
import {ExpressionNode, ExpressionTree, Operator} from '../types/ExpressionTree';
import {Pagination} from '@nextui-org/react';
import {ArrowLeft} from 'iconsax-react';
import {useState} from "react";
import React from 'react';
import {TbChalkboard} from "react-icons/all";
import {motion} from "framer-motion";

export function GeometriePanel() {
    const progress = useProgressContext();
    const navigate = useNavigate();

    const settings = useSettingsContext();
    const avatar = settings.value.settings.avatar;

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
                            <ProgressExerciseCard level={1}
                                                  to='/geometrie/culori'
                                                  exercise='Recunoaşterea Culorilor'
                                                  current={progress.value.level1.matematica
                                                      .parts.get('geometrie')?.parts.get('culori')?.current as number}
                                                  total={progress.value.level1.matematica
                                                      .parts.get('geometrie')?.parts.get('culori')?.total as number}
                            />
                        </Grid>
                        <Grid sm={6} justify='center'>
                            <ProgressExerciseCard level={1}
                                // disabled
                                                  to='/geometrie/comparare'
                                                  exercise='Comparare Figuri'
                                                  current={progress.value.level1.matematica
                                                      .parts.get('geometrie')?.parts.get('comparare')?.current as number}
                                                  total={progress.value.level1.matematica
                                                      .parts.get('geometrie')?.parts.get('comparare')?.total as number}
                            />
                        </Grid>
                    </Grid.Container>
                </div>
                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                >
                    <Button onPress={() => navigate('/geometrie/desenare_figuri')}
                            css={{
                                fontFamily: "DM Sans", background: "$white", color: "$black",

                            }}
                            shadow
                            size="md"
                            color={
                                avatar.color === "yellow" ? "warning"
                                    : avatar.color === "blue" ? "primary"
                                        : (avatar.color === "purple" || avatar.color === "pink") ? "secondary"
                                            : avatar.color === "green" ? "success" : "gradient"
                            }
                            icon={<TbChalkboard size={20}/>}
                    >
                        Deschide Tabla
                    </Button>
                </motion.div>
                {/*<ProgressExerciseCard level={3}*/}
                {/*    // disabled*/}
                {/*                      progressLess={true}*/}
                {/*                      to='/geometrie/desenare_figuri'*/}
                {/*                      exercise='Tablă'*/}
                {/*                      current={1}*/}
                {/*                      total={1}*/}
                {/*/>*/}
            </div>
        </AnimatedPage>
    );
}