import './ProgressSubjectCard.scss';
import { Card, Progress } from "@nextui-org/react";

interface ProgressSubjectCardProps {
    subject: string,
    progress: number,
}

export function ProgressSubjectCard({subject, progress}: ProgressSubjectCardProps) {
    return(
        <div className="progress-card progress-subject-card">
            <Card css={{height: "150px"}} isHoverable isPressable>
                <Card.Header css={{fontFamily: "DM Sans", fontWeight: 'bold'}}>
                    {subject}
                </Card.Header>
                <Card.Body>
                    <Progress value={progress} 
                    size="lg" 
                    color={
                        progress > 70 ? "success"
                        : progress > 30 ? "primary" : "secondary"
                    } />
                </Card.Body>
            </Card>
        </div>
    );
}