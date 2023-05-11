import './DesenareFiguri.sass';
//@ts-ignore
import stick_llama from '@/assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '@/components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import {useEffect, useRef, useState} from "react";
import {useProgressContext, useDifficultyContext, useStorageContext} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, message, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerWave} from "react-icons/all";
//@ts-ignore
import success_sound from '@/assets/audio/sfx/success_sound.aac';
//@ts-ignore
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import ReactHowler from 'react-howler';
import random from 'random';
import React from 'react';
import {Canvas, Tldraw, TldrawEditor, useApp} from "@tldraw/tldraw";
import {track} from "signia-react";
import './DesenareFiguri.sass';
import '@/../fonts/IBMPlexSerif-Medium.woff2';
import '@/../fonts/IBMPlexSans-Medium.woff2';
import '@/../fonts/IBMPlexMono-Medium.woff2';
import '@/../fonts/Shantell_Sans-Normal-SemiBold.woff2';
import '@tldraw/tldraw/editor.css';
import '@tldraw/tldraw/ui.css';
import {join} from "path";
import path from "node:path";

const shapeTypes = ["circle", "rectangle", "triangle"];

export function DesenareFiguri() {
    const navigate = useNavigate();
    const progress = useProgressContext();
    const storage = useStorageContext();
    const [tourVisible, setTourVisible] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const messageSuccess = () => messageApi.success('Tabla a fost salvată', 1);
    const messageLoading = () => messageApi.loading('Verificare', .5);

    message.config({
        top: 200,
        maxCount: 1,
        prefixCls: 'notification',
        duration: 500
    });

    useEffect(() => {
    }, []);


    const root = path.join(__dirname, "..", "..", "..", "..", "..", "..");

    const assets = path.join(root, "src", "assets");

    console.log(assets);

    return (
        <AnimatedPage>
            <div className="card-holder drawing-board">
                <div className="background-card">
                    <Spacer y={1}/>
                    <div style={{
                        display: 'flex',
                    }}>
                        <Spacer x={1}/>
                        <Button auto size='xs' icon={<ArrowLeft size="24"
                                                                className="close-button" color="#000"
                        />}
                                shadow color="primary"
                                css={{
                                    width: "36px", height: "36px",
                                    bg: '#fefefe'
                                }}
                                onPress={() => navigate(-1)}
                        />

                    </div>
                    <Spacer y={2}/>
                    <div style={{
                        display: 'flex',
                    }}>
                        <Spacer x={5}/>
                        <Tldraw
                            assetBaseUrl={"../../src/assets/"}
                            baseUrl={"../../src/assets/"}
                        />
                        <Spacer x={5}/>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
