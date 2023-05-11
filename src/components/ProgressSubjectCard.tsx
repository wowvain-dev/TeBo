import './ProgressSubjectCard.scss';
import {Card, Progress} from "@nextui-org/react";
import {TbMathSymbols} from 'react-icons/tb';
import {useNavigate} from 'react-router-dom';
import {useSettingsContext} from "@/services/context";
import {Image} from "antd";

interface ProgressSubjectCardProps {
    subject: string,
    current: number,
    total: number,
    to: string
}

export function ProgressSubjectCard({subject, current, total, to}: ProgressSubjectCardProps) {
    const navigate = useNavigate();
    const settings = useSettingsContext();
    const avatar = settings.value.settings.avatar;

    let llama_pic: string = "";

    if (subject === "Aritmetică") {
        if (current === total) llama_pic = avatar.getAlgebra(true);
        else llama_pic = avatar.getAlgebra(false);
    }
    if (subject === "Geometrie") {
        if (current === total) llama_pic = avatar.getGeometrie(true);
        else llama_pic = avatar.getGeometrie(false);
    }
    if (subject === "Limbă şi Comunicare") {
        if (current === total) llama_pic = avatar.getRomana(true);
        else llama_pic = avatar.getRomana(false);
    }

    return (
        <div className="progress-card progress-subject-card">
            <Card css={{height: "150px"}} isHoverable isPressable
                  onPress={() => navigate(to)}
            >
                <Card.Header css={{fontFamily: "DM Sans", fontWeight: 'bold'}}>
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        width: '100%', justifyContent: 'space-between',
                        height: 50
                    }}>
                        {subject}
                        <Image src={llama_pic} height={75} width={50}/>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Progress value={current * 100 / total}
                              size="lg"
                              color={current >= total ? 'success' : 'primary'}/>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <p style={{fontFamily: "DM Sans"}}>{current} / {total}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}