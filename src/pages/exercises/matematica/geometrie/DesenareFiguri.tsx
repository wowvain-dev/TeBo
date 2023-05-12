import './DesenareFiguri.sass';
//@ts-ignore
import stick_llama from '@/assets/stick-LLAMA-nerd-yellow.png';
import AnimatedPage from '@/components/AnimatedPage';
import {IconScreenshot} from '@tabler/icons-react';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip, useModal} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import {useEffect, useRef, useState} from "react";
import {useProgressContext, useDifficultyContext, useStorageContext} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, message, notification, Tour, TourProps, Button as AButton} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerWave, RxEnterFullScreen, TfiFullscreen} from "react-icons/all";
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
import {motion} from 'framer-motion';

const shapeTypes = ["circle", "rectangle", "triangle"];

export function DesenareFiguri() {
    const navigate = useNavigate();
    const progress = useProgressContext();
    const storage = useStorageContext();

    const {setVisible, bindings} = useModal();
    const [modalOpen, setModalOpen] = useState(false);

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

    bindings.onClose = () => {
        setModalOpen(false)
        setVisible(false);
    }

    return (
        <AnimatedPage>
            <Modal
                fullScreen
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                open={modalOpen}
                css={{
                    minW: '100vw',
                    // pt: "3rem"
                    pt: 0
                }}
                onClose={() => {
                    setModalOpen(false);
                }}
            >
                <Modal.Header>
                    <span style={{
                        fontFamily: "DM Sans",
                        fontSize: '24px'
                    }}>Tablă</span>
                </Modal.Header>
                <Modal.Body
                    css={{
                        display: 'flex',
                        p: 0
                    }}
                >
                    <Tldraw
                        assetBaseUrl={"../../src/assets/"}
                        baseUrl={"../../src/assets/"}
                    />
                </Modal.Body>
            </Modal>
            <div className="drawing-board">
                <div className="background-card">
                    <Spacer y={1}/>
                    <div style={{
                        display: 'flex',
                    }}>
                        <motion.div
                            style={{marginLeft: '15px'}}
                            whileHover={{
                                scale: 1.1
                            }}
                        >
                            <AButton icon={<ArrowLeft size="24" color="#000"/>}
                                     onClick={() => navigate(-1)}
                                     style={{
                                         width: '40px', height: '40px',
                                         padding: 0,
                                         display: 'flex', justifyContent: 'center', alignItems: 'center'
                                     }}
                            />
                        </motion.div>
                        <div style={{flex: '1'}}/>
                        <motion.div
                            style={{marginRight: '15px'}}
                            whileHover={{
                                scale: 1.1
                            }}
                        >
                            <AButton icon={<TfiFullscreen size="24" color="#000"/>}
                                     onClick={() => {
                                         setVisible(true);
                                         setModalOpen(true);
                                     }}
                                     style={{
                                         width: '40px', height: '40px',
                                         padding: 0,
                                         display: 'flex', justifyContent: 'center', alignItems: 'center'
                                     }}
                            />
                        </motion.div>
                    </div>
                    <div style={{
                        display: 'flex', marginTop: '10px', marginRight: '15px',
                        marginLeft: '15px', height: '75vh'
                    }}>
                        {/*<Spacer x={5}/>*/}
                        {!modalOpen &&
                            <div style={{width: '100%'}}>
                                <Tldraw
                                    assetBaseUrl={"../../src/assets/"}
                                    baseUrl={"../../src/assets/"}
                                />
                            </div>
                        }
                        {/*<Spacer x={5}/>*/}
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
