import './ProgressSubjectCard.scss';
import { Card, Progress } from "@nextui-org/react";

interface ProgressSubjectCardProps {
    subject: string,
    current: number,
    total: number
}

export function ProgressSubjectCard({subject, current, total}: ProgressSubjectCardProps) {
    return(
        <div className="progress-card progress-subject-card">
            <Card css={{height: "150px"}} isHoverable isPressable>
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