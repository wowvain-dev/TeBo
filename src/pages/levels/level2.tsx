import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';

function Level2() {
    const navigate = useNavigate();
    return(
        <AnimatedPage>
        <div>
            <h1 onClick={() => navigate('/')}>LEVEL2</h1>
        </div>
        </AnimatedPage>
    );
}

export default Level2;