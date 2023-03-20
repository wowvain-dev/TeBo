import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const animations = {
    initial: {
        opacity: 0, x: 100, y:0
    },
    animate: {
        opacity: 1, x: 0, y:0
    },
    exit: {
        opacity: 0, x: -100, y:0
    },
}

interface AnimatedPageProps {
    children: JSX.Element[] | JSX.Element
};

function AnimatedPage({children}: AnimatedPageProps) {
    return (
        <motion.div 
            initial={{opacity:0, x: 100}}
            animate={{opacity:1, x:0}}
            exit={{opacity:0, x:-100}}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedPage;