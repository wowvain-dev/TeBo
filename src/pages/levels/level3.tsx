import { useNavigate } from 'react-router-dom';
function Level3() {
    const navigate = useNavigate();
    return(
        <div>
            <h1 onClick={() => navigate('/')}>LEVEL3</h1>
        </div>
    );
}

export default Level3;