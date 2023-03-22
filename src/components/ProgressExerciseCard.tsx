import './ProgressExerciseCard.scss';
import { Card, Progress } from "@nextui-org/react";
import { CiRuler } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

interface ProgressExerciseCardProps {
    to: string
    exercise: string,
    current: number,
    total: number,
}

export function ProgressExerciseCard({to, exercise, current, total}: ProgressExerciseCardProps) {
    const navigate = useNavigate();
    return(
        <div className="progress-card progress-exercise-card">
            <Card css={{height: "150px"}} isHoverable isPressable
               onPress={() => navigate(to)} 
            >
                <Card.Header css={{fontFamily: 'DM Sans', fontWeight: 'bold'}}>
                    {exercise}
                </Card.Header>
                <Card.Body>
                    <Progress value={current * 100 / total}
                        size="lg"
                        color={current >= total ? 'success' : 'secondary'}/>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <p style={{fontFamily: 'DM Sans'}}>{current} / {total}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}