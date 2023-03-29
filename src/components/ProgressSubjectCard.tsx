import './ProgressSubjectCard.scss';
import { Card, Progress } from "@nextui-org/react";
import { TbMathSymbols } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

interface ProgressSubjectCardProps {
    subject: string,
    current: number,
    total: number,
    to: string
}

export function ProgressSubjectCard({subject, current, total, to}: ProgressSubjectCardProps) {
    const navigate = useNavigate();

    return(
        <div className="progress-card progress-subject-card">
            <Card css={{height: "150px"}} isHoverable isPressable
                onPress={() => navigate(to)}                
            >
                <Card.Header css={{fontFamily: "DM Sans", fontWeight: 'bold'}}>
                    {subject}
                </Card.Header>
                <Card.Body>
                    <Progress value={current * 100 / total} 
                    size="lg" 
                    color={current >= total ? 'success' : 'primary'} />
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <p style={{fontFamily: "DM Sans"}}>{current} / {total}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}