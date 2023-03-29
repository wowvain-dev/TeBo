import './ProgressExerciseCard.scss';
import { Card, Progress } from "@nextui-org/react";
import { CiRuler } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { DifficultyLevel } from './DifficultyLevel';

interface ProgressExerciseCardProps {
    to: string
    exercise: string,
    current: number,
    total: number,
    disabled?: boolean,
    level: number,
	color: "purple" | "pink" | "blue" | "green" | "yellow",
	type: "cool" | "nerd"
}

export function ProgressExerciseCard({to, exercise, current, total, disabled, level, type, color}: ProgressExerciseCardProps) {
    const navigate = useNavigate();
    return(
        <div className="progress-card progress-exercise-card" style={{opacity: disabled === true ? '40%' : '100%'}}>
            <Card css={{height: "150px"}} isHoverable={!disabled} isPressable={!disabled}
               onPress={() => navigate(to)} 
            >
                <Card.Header css={{fontFamily: 'DM Sans', fontWeight: 'bold', justifyContent: 'space-between'}}>
                    {exercise}
                    <DifficultyLevel level={level} color={color} type={type} />
                </Card.Header>
                <Card.Body>
                    <Progress value={current * 100 / total}
                        size="lg"
                        color={current >= total ? 'success' : 'secondary'}/>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <p style={{fontFamily: 'DM Sans'}}>{current >= total ? total : current} / {total}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}