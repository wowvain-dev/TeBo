import './SettingsPanels.sass';
import {Dispatch, forwardRef, ReactNode, SetStateAction, useEffect, useState} from "react";
import {Breadcrumb, BreadcrumbProps, InputNumber, message, Select, SelectProps, Slider, Space} from "antd";
import {useDifficultyContext} from "@/services/context";
import {Button, PressEvent, Spacer} from "@nextui-org/react";
import {Operator} from "@/types/ExpressionTree";
import {Box, Flex, MultiSelect, SelectItemProps} from '@mantine/core';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineSetting, RiDivideFill, TiTimes} from "react-icons/all";
import {ExpressionDifficulty} from "@/services/DifficultyManager";

export const OperatiiSettings = () => {
    const context = useDifficultyContext();
    const op_difficulty = context.value.operatii;
    const [lowLimit, setLowLimit] = useState<number | null>(1);
    const [highLimit, setHighLimit] = useState<number | null>(10);
    const [saveColor, setSaveColor] =
        useState<"primary" | "secondary" | "error" | "success">('primary');
    const [allowedOp, setAllowedOp] =
        useState<Operator[] | null>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [indentLevel, setIndentLevel] = useState<number | null>(0);
    const [changes, setChanges] = useState<boolean>(false);

    const opOptions = [{
        label: 'Adunare',
        value: Operator.plus
    }, {
        label: 'Scădere',
        value: Operator.minus
    }, {
        label: 'Înmulțire',
        value: Operator.mul
    }, {
        label: 'Împărțire',
        value: Operator.div
    }];

    const messageSuccess = () => messageApi.success('Setările au fost salvate', 1);
    const messageLoading = () => messageApi.loading('Verificare', .5);

    message.config({
        top: 200,
        maxCount: 1,
        prefixCls: 'notification',
        duration: 500
    });

    useEffect(() => {
        setLowLimit(op_difficulty.lowLimit);
        setHighLimit(op_difficulty.maxLimit);
        setAllowedOp(op_difficulty.allowedOperators);
        setIndentLevel(op_difficulty.depth - 1);
        setChanges(false);
    }, []);

    const handleRangeChange = ([low_l, high_l]: [number, number]) => {
        if (low_l < 1) low_l = 1;
        if (high_l > 100) high_l = 100;
        if (high_l - low_l < 9) {
            if (low_l + 9 > 100) {
                low_l = high_l - 9;
            } else if (high_l - 9 < 1) {
                high_l = low_l + 9;
            } else {
                low_l = high_l - 9;
            }
        }

        setLowLimit(low_l);
        setHighLimit(high_l);
    }

    const handleOperationChange = (value: any) => {
        setAllowedOp(value);
        console.log(value);
    }

    const handleIndentChange = (value: number) => {
        setIndentLevel(value);
        console.log(value);
    }
    const onSave = () => {
        if (allowedOp === null || allowedOp?.length === 0) {
            messageLoading().then(() =>
                messageApi.error("Alegeți cel puțin o operație permisă", 1.5)
            );
            setSaveColor("error");
            setTimeout(() => setSaveColor("primary"), 500);
        } else {
            setSaveColor("success");
            setTimeout(() => setSaveColor("primary"), 500);
            messageLoading().then(() => {
                messageSuccess();
                op_difficulty.lowLimit = lowLimit ?? 0;
                op_difficulty.maxLimit = highLimit ?? 0;
                op_difficulty.depth = (indentLevel ?? 0) + 1;
                op_difficulty.allowedOperators = allowedOp ?? [];

                let dif_copy = context.value;
                dif_copy.operatii = op_difficulty;

                context.setValue(dif_copy);
                context.value.write();

                setChanges(false);
            });
        }
    }

    console.log(`saved: ${context.value.operatii.depth}; setting" ${indentLevel}`);

    const areThereChanges = (): boolean => {
        if (!lowLimit || !highLimit || !allowedOp) return false;
        // @ts-ignore
        return (lowLimit !== op_difficulty.lowLimit) || (highLimit !== op_difficulty.maxLimit)
            //@ts-ignore
            || (allowedOp !== op_difficulty.allowedOperators) || (indentLevel + 1 !== op_difficulty.depth)
    };

    // @ts-ignore
    console.log(`${(indentLevel + 1) !== op_difficulty.depth}`)

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
                            let new_dif = new ExpressionDifficulty();

                            setLowLimit(new_dif.lowLimit);
                            setHighLimit(new_dif.maxLimit);
                            setIndentLevel(new_dif.depth - 1);
                            setAllowedOp(new_dif.allowedOperators);
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
            <div className="range">
                {contextHolder}
                <h4>Configurare interval numeric</h4>
                <div className="inputs">
                    <InputNumber value={lowLimit} onChange={(val) => {
                        if (!val || !highLimit) return;
                        if (highLimit - val < 9) {
                            val = highLimit - 9;
                        }
                        setLowLimit(val)
                    }
                    } min={1} max={100}
                                 step={1} style={{marginRight: '10px'}}/>
                    <Slider range value={[lowLimit ?? 0, highLimit ?? 0]}
                            onChange={handleRangeChange} tooltip={{open: true}}
                            min={1} max={100} step={1}
                            className="slider"
                    />
                    <InputNumber value={highLimit} onChange={(val) => {
                        if (!val || !lowLimit) return;
                        if (val - lowLimit < 9) {
                            val = lowLimit + 9;
                        }
                        setHighLimit(val)
                    }}
                                 step={1} style={{marginLeft: '10px'}}
                                 min={1} max={100}
                    />
                </div>
            </div>
            <Spacer y={2}/>
            <div className="signs">
                <h4>Configurare operații permise</h4>
                <Space direction="vertical" style={{width: '100%'}}>
                    {/*<Select mode="multiple" placeholder="Alegeți operațiile permise" value={allowedOp}*/}
                    {/*		onChange={handleOperationChange} options={opOptions} style={{width: '100%'}}*/}
                    {/*		showSearch*/}
                    {/*/>*/}
                    {/* @ts-ignore */}
                    <MultiSelect value={allowedOp} data={opOptions} placeholder="Alegeți operațiile permise"
                                 onChange={handleOperationChange} error={allowedOp?.length === 0}/>
                </Space>
            </div>
            <Spacer y={2}/>
            <div className="indent">
                <h4>Configurare număr permis de paranteze</h4>
                <div style={{display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{marginRight: '1rem', fontFamily: 'DM Sans'}}>{indentLevel}</span>
                    <Slider value={indentLevel ?? 0} min={0} max={5} step={1}
                            onChange={handleIndentChange} style={{flex: '1'}}
                    />
                </div>
            </div>
            <div style={{flex: 1}}/>
        </div>
    );
};