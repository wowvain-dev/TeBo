import { Outlet } from 'react-router-dom';
import './layout.scss';
import Header from "../components/Header";
import { Button } from '@nextui-org/react';
import { Candle2, MessageQuestion } from 'iconsax-react';
// @ts-ignore
import { motion } from 'framer-motion';

function Footer() {
    return <div>
        <p>FOOTER</p>
    </div>
}

export function PageLayout() {
    return(
        <div className="page-layout"
        >
            <Header />
            <Outlet />
            <motion.div 
            whileHover={{
                scale: 1.1
            }} 
            style={{
                position: 'absolute',
                left: '15px',
                bottom: '15px'
            }}>
                <Button 
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
                <Button
                // ghost
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
            <Outlet /> 
        </div>
    );
}