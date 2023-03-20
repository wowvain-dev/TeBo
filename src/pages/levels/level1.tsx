import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import './level1.scss';
import { Text } from '@nextui-org/react';

function Level1() {
    const navigate = useNavigate();
    return (
        <AnimatedPage>
            <div className="card-holder level1">
                <div className="background-card">
                    <Text h1 onClick={() => navigate('/')}>LEVEL1</Text>
                </div>
            </div>
        </AnimatedPage>
    );
}

export default Level1;