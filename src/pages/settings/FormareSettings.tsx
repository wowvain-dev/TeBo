import './SettingsPanels.sass';
import {useEffect, useState} from "react";
import {Select} from '@mantine/core';
import {InputNumber, message, Slider, Switch} from "antd";
import {useDifficultyContext} from "@/services/context";
import {Button, PressEvent, Spacer} from "@nextui-org/react";
import {ExpressionDifficulty, FormareDifficulty, FormareType} from "@/services/DifficultyManager";

export const FormareSettings = () => {
    const context = useDifficultyContext();
    const formareDifficulty = context.value.formare;
    const [formType, setFormType] = useState<FormareType>(FormareType.U);
    const [saveColor, setSaveColor] =
        useState<"primary" | "secondary" | "error" | "success">('primary');
    const [messageApi, contextHolder] = message.useMessage();
    const [changes, setChanges] = useState<boolean>(false);

    const messageSuccess = () => messageApi.success('Setările au fost salvate', 1);
    const messageLoading = () => messageApi.loading('Verificare', .5);

    message.config({
        top: 200,
        maxCount: 1,
    });

    useEffect(() => {
        setFormType(formareDifficulty.formationType);
    }, []);

    const handleFormTypeChange = (val: FormareType) => {
        setFormType(val);
    }


    const onSave = () => {
        setSaveColor('success');
        setTimeout(() => {
            setSaveColor('primary');
        }, 500);
        messageLoading().then(() => {
            messageSuccess();
            formareDifficulty.formationType = formType;

            let dif_copy = context.value;
            dif_copy.formare = formareDifficulty;

            context.setValue(dif_copy);
            context.value.write();

            setChanges(false);
        });
    };

    const selectOptions = [
        {value: FormareType.U, label: "U"},
        {value: FormareType.ZU, label: "ZU"},
        {value: FormareType.SZU, label: "SZU"},
        {value: FormareType.MSZU, label: "MSZU"},

    ];

    const areThereChanges = (): boolean => {
        return formType !== formareDifficulty.formationType;
    };

    useEffect(() => {
        setChanges(areThereChanges());
    }, [areThereChanges, context.value]);

    return (
        <div className="settings-panel-content">
            <Spacer y={1}/>
            {contextHolder}
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}/>
                <Button size="sm"
                        bordered
                        style={{
                            fontFamily: 'DM Sans', background: 'rgba(0,0,0,0)',
                            borderRadius: '6px', color: '#f5212d', borderColor: '#f5212d'
                        }}
                        onPress={() => {
                            let new_dif = new FormareDifficulty();

                            setFormType(new_dif.formationType);
                        }} color="error"
                >
                    Resetați valorile
                </Button>
                <Spacer x={1}/>
                <Button size="sm" style={{fontFamily: 'DM Sans', borderRadius: '6px'}} disabled={!changes}
                        onClick={() => onSave()} color={saveColor}
                >
                    Salvați
                </Button>
            </div>
            <div style={{flex: 1}}/>
            <div className="allow_wholes">
                <h4 style={{marginBottom: '0', marginRight: '1rem'}}>Care este formatul numerelor generate?</h4>
                {/* @ts-ignore */}
                <Select value={formType} data={selectOptions} onChange={(val) => setFormType(val)}/>
            </div>

            <div style={{flex: 1}}/>

        </div>
    );
};