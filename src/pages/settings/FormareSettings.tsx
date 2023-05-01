import './SettingsPanels.sass';
import {useEffect, useState} from "react";
import {Select} from '@mantine/core';
import {InputNumber, message, Slider, Switch} from "antd";
import {useDifficultyContext} from "@/services/context";
import {Button, PressEvent, Spacer} from "@nextui-org/react";
import {FormareType} from "@/services/DifficultyManager";

export const FormareSettings = () => {
	const context = useDifficultyContext();
	const formareDifficulty = context.value.formare;
	const [formType, setFormType] = useState<FormareType>(FormareType.U);
	const [saveColor, setSaveColor] =
		useState<"primary" | "secondary" | "error" | "success">('primary');
	const [messageApi, contextHolder] = message.useMessage();

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


	const onSave = (e: PressEvent) => {
		messageLoading().then(() => messageSuccess());

		formareDifficulty.formationType = formType;

		let dif_copy = context.value;
		dif_copy.formare = formareDifficulty;

		context.setValue(dif_copy);

		setSaveColor('success');
		setTimeout(() => {
			setSaveColor('primary');
		}, 500);
	};

	const selectOptions = [
		{value: FormareType.U, label: "U"},
		{value: FormareType.ZU, label: "ZU"},
		{value: FormareType.SZU, label: "SZU"},
		{value: FormareType.MSZU, label: "MSZU"},

	];

	return (
		<div className="settings-panel-content">
			<Spacer y={1}/>
			{contextHolder}
			<div className="allow_wholes">
				<h4 style={{marginBottom: '0', marginRight: '1rem'}}>Care este formatul numerelor generate?</h4>
				{/* @ts-ignore */}
				<Select value={formType} data={selectOptions} onChange={(val) => setFormType(val)}/>
			</div>

			<div style={{flex: 1}}/>

			<Button className="settings-save-button" onPress={onSave} color={saveColor}
					style={{fontFamily: "DM Sans"}}
			>Salvează</Button>
		</div>
	);
};