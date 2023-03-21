import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';

function Level3() {
    const navigate = useNavigate();
    return(
        <AnimatedPage>
        <div>
            <h1 onClick={() => navigate('/')}>LEVEL3</h1>
        </div>
        </AnimatedPage>
    );
}

export default Level3;