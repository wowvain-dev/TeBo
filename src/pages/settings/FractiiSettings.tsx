import './SettingsPanels.sass';
import {Dispatch, forwardRef, ReactNode, SetStateAction, useEffect, useState} from "react";
import {Breadcrumb, BreadcrumbProps, InputNumber, message, Select, SelectProps, Slider, Space, Switch} from "antd";
import {useDifficultyContext} from "@/services/context";
import {Button, PressEvent, Spacer} from "@nextui-org/react";
import {Operator} from "@/types/ExpressionTree";
import {Box, Flex, MultiSelect, SelectItemProps, Tooltip} from '@mantine/core';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineSetting, CiCircleInfo, RiDivideFill, TiTimes} from "react-icons/all";
import {ExpressionDifficulty} from "@/services/DifficultyManager";
import {FractionDifficulty} from "@/services/DifficultyManager";

export const FractiiSettings = () => {
    const context = useDifficultyContext();
    const frac_difficulty = context.value.fractii;
    const [lowLimit, setLowLimit] = useState<number | null>(1);
    const [highLimit, setHighLimit] = useState<number | null>(10);
    const [allowWholes, setAllowWholes] = useState<boolean>(false);
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
        setLowLimit(frac_difficulty.lowLimit);
        setHighLimit(frac_difficulty.maxLimit);
        setAllowWholes(frac_difficulty.allowWholes);
        setChanges(false);
    }, []);

    const handleRangeChange = ([low_l, high_l]: [number, number]) => {
        setLowLimit(low_l);
        setHighLimit(high_l);
    }

    const handleWholeChange = (value: boolean) => {
        setAllowWholes(value);
    }

    const onSave = () => {
        setSaveColor('success');
        setTimeout(() => {
            setSaveColor('primary');
        }, 500);
        messageLoading().then(() => {
            messageSuccess();
            frac_difficulty.lowLimit = lowLimit ?? 0;
            frac_difficulty.maxLimit = highLimit ?? 0;
            frac_difficulty.allowWholes = allowWholes;

            let dif_copy = context.value;
            dif_copy.fractii = frac_difficulty;

            context.setValue(dif_copy);
            context.value.write();

            setChanges(false);
        });
    };


    const areThereChanges = (): boolean => {
        return lowLimit !== frac_difficulty.lowLimit || highLimit !== frac_difficulty.maxLimit
            || allowWholes !== frac_difficulty.allowWholes;
    }

    useEffect(() => {
        setChanges(areThereChanges());
    }, [areThereChanges, context.value]);


    return (
        <div className="settings-panel-content">
            <Spacer y={1}/>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}/>
                <Button size="sm"
                        bordered
                        style={{
                            fontFamily: 'DM Sans', background: 'rgba(0,0,0,0)',
                            borderRadius: '6px', color: '#f5212d', borderColor: '#f5212d'
                        }}
                        onPress={() => {
                            let new_dif = new FractionDifficulty();

                            setLowLimit(new_dif.lowLimit);
                            setHighLimit(new_dif.maxLimit);
                            setAllowWholes(new_dif.allowWholes);
                        }} color="error">
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
            <div className="range">
                {contextHolder}
                <h4>Configurare interval numeric</h4>
                <div className="inputs">
                    <InputNumber value={lowLimit} onChange={(val) => setLowLimit(Math.floor(val ?? 1))}
                                 step={1} style={{marginRight: '10px'}}/>
                    <Slider range value={[lowLimit ?? 1, highLimit ?? 0]}
                            onChange={handleRangeChange} tooltip={{open: true}}
                            min={1} max={100} step={1}
                            className="slider"
                    />
                    <InputNumber value={highLimit} onChange={(val) => setHighLimit(Math.floor(val ?? 1))}
                                 step={1} style={{marginLeft: '10px'}}/>
                </div>
                <span style={{fontFamily: 'DM Sans', fontSize: '12px', fontStyle: 'italic', textAlign: 'center'}}>Intervalul se aplică pentru numitor.<br/> Numărătorul va avea valori între 1 și dublul numitorului.</span>
            </div>
            <Spacer y={2}/>
            <div className="allow_wholes">
                <h4 style={{marginBottom: '0', marginRight: '1rem'}}>Permite fracții supraunitare?</h4>
                <Switch onChange={handleWholeChange} checked={allowWholes}/>
            </div>

            <div style={{flex: 1}}/>

        </div>
    );
};