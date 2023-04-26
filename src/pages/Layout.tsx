import { Outlet } from 'react-router-dom';
import './Layout.scss';
import Header from "../components/Header";
import { Button } from '@nextui-org/react';
import { ArrowRight, Candle2, MessageQuestion, ArrowLeft } from 'iconsax-react';
// @ts-ignore
import { motion } from 'framer-motion';
import { Tour, TourProps } from 'antd';
import { useState, useRef } from 'react';
import { HiOutlineSpeakerWave } from 'react-icons/all';
import stick_llama from '@/assets/stick-LLAMA-nerd-purple.png';

function Footer() {
    return <div>
        <p>FOOTER</p>
    </div>
}

export function PageLayout() {
    
    const [showTour, setShowTour] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    let headerRef = useRef(null);
    let mainContentRef = useRef(null);
    let settingsRef = useRef(null);

    const tourSteps: TourProps['steps'] = [
        // {
        //     title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
        //         Aici puteţi vedea unde vă aflaţi în culegere. Puteţi da click pe locaţii anterioare pentru a vă întoarce la acestea
        //         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
        //             <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
        //             <div style={{ flex: '1' }}></div>
        //             <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
        //         </div>
        //     </div>
        //     ),
        //     target: () => breadcrumbsRef.current,
        //     nextButtonProps: {
        //         children: <ArrowRight size={25} />
        //     },
        //     prevButtonProps: {}
        // },
        {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Header-ul Aplicaţiei
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px', zIndex: '0' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            description: (<div>
                În stânga puteţi găsi o detaliere clară a unde vă aflaţi în aplicaţie <br/>
                În dreapta puteţi observa progresul făcut relativ cu ecranul în care vă aflaţi
            </div>),
            target: () => headerRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            // prevButtonProps: {
            //     children: <ArrowLeft size={25} />
            // }
        },
        {
            title: (<div style={{ display: 'flex', flexDirection: 'column' }}>
                Meniul de setări al aplicaţiei
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <Button auto light color='primary' icon={<HiOutlineSpeakerWave size={32} />}></Button>
                    <div style={{ flex: '1' }}></div>
                    <img style={{ scale: '150%', height: '100px', marginRight: '20px' }} src={stick_llama} alt='Llama ajutatoare' />
                </div>
            </div>
            ),
            target: () => settingsRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25} />
            },
            prevButtonProps: {
                children: <ArrowLeft size={25} />
            }
        },
    ];

    return(
        <div className="page-layout"
        >
            <Tour steps={tourSteps} open={showTour} onClose={() => setShowTour(false)}/>
            <div ref={headerRef}>
                <Header />
            </div>
            <div ref={mainContentRef}>
                <Outlet />
            </div>
            <motion.div 
            whileHover={{
                scale: 1.1
            }} 
            style={{
                position: 'absolute',
                left: '15px',
                bottom: '15px'
            }}>
                {/* SETTINGS BUTTON */}
                <Button  ref={settingsRef}
                auto size='xs' css={{
                    background: '$normalWhite'
                }}
                style={{width: '40px', height: '40px'}}
                >
                    <Candle2 size="25" color="#2a2b2a"/>
                </Button>
            </motion.div>
            <div style={{
                position: 'absolute',
                right: '15px',
                bottom: '15px'
            }}>
                {/* HELP BUTTON */}
                <Button
                // ghost
                onPress={() => setShowTour(true)}
                auto size='xs' css={{
                    background: '$normalWhite'
                }}
                style={{width: '40px', height: '40px'}}>
                    <MessageQuestion size="25" color="#2a2b2a"/>
                </Button>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export function OverallLayout() {
    return(
        <div className="overall-layout"
        >
            {/*<Outlet /> */}
            <PageLayout />
        </div>
    );
}