import { useNavigate } from 'react-router-dom';

function Level2() {
    const navigate = useNavigate();
    return(
        <div>
            <h1 onClick={() => navigate('/')}>LEVEL2</h1>
        </div>
    );
}

export default Level2;