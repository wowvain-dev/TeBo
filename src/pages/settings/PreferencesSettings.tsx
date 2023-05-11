import {Button} from "@nextui-org/react";
import {useSettingsContext, useStorageContext} from "@/services/context";
import {backgrounds} from "@/services/context";
import {Radio, Image, Divider, message} from "antd";
import {Avatar, AvatarColor, AvatarType, SettingsManager} from "@/services/SettingsManager";
import {CheckIcon, ColorSwatch, Group, rem, Avatar as MAvatar, Text, Select} from "@mantine/core";
import {forwardRef, useEffect, useState} from "react";

const Colors = {
    "blue":
        "#8bddff"
    ,
    "yellow":
        "#fff287"
    ,
    "pink":
        "#e7abf7"
    ,
    "purple":
        "#f6aaee"
    ,
    "green":
        "#c9ffcd"
}

export function PreferencesSettings() {
    const settings = useSettingsContext();
    const storage = useStorageContext();
    const [messageApi, contextHolder] = message.useMessage();

    const [saveColor, setSaveColor] = useState<"primary" | "success">("primary");
    const [chosenBackground, setChosenBackground] = useState<string>("");
    const [chosenColor, setChosenColor] = useState<AvatarColor>("blue");
    const [chosenType, setChosenType] = useState<AvatarType>("cool");
    const [previewAvatar, setPreviewAvatar] = useState<Avatar>(
        new Avatar("cool", "blue")
    )

    const messageSuccess = () => messageApi.success("Setările au fost salvate", 1);
    const messageLoading = () => messageApi.loading("Se salvează", .5);

    message.config({
        top: 200,
        maxCount: 1,
        prefixCls: 'notification',
        duration: 500
    });

    useEffect(() => {
        setChosenBackground(settings.value.settings.background);
        setChosenColor(settings.value.settings.avatar.color);
        setChosenType(settings.value.settings.avatar.type);
        setPreviewAvatar(new Avatar(chosenType, chosenColor))
        setSaveColor("primary");
    }, [])

    useEffect(() => {
        setPreviewAvatar(new Avatar(chosenType, chosenColor));
    }, [chosenColor, chosenType]);

    const data = [
        {
            image: new Avatar("nerd", previewAvatar.color).getHead(),
            value: "nerd",
            label: "Ochelari Circulari"
        }, {
            image: new Avatar("cool", previewAvatar.color).getHead(),
            value: "cool",
            label: "Ochlari de Soare"
        }
    ];

    interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
        image: string;
        label: string;
    }

    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
        ({
             image, label, ...others
         }: ItemProps, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <MAvatar src={image}/>
                    <div>
                        <Text style={{fontFamily: 'DM Sans'}}>{label}</Text>
                    </div>
                </Group>
            </div>
        )
    )

    const swatches = Object.entries(Colors).map(([key, value]) => (
        <ColorSwatch
            component="button"
            onClick={() => {
                setChosenColor(key as AvatarColor)
            }}
            sx={{
                cursor: 'pointer',
                borderRadius: '14px',
                color: '#000',
                background: 'rgba(0,0,0,0)'
            }}
            style={{
                width: '40px', height: '40px'
            }} color={value} key={key}>
            {chosenColor === key && <CheckIcon width={rem(10)}/>}
        </ColorSwatch>
    ));
    // console.log(`name: ${Colors["blue" as keyof typeof any]};`)

    // const swatches = Object.keys(Colors).map((color, index) => (
    //     <ColorSwatch key="color" color={} />
    // ))

    function areThereChanges(): boolean {
        return (previewAvatar.type !== settings.value.settings.avatar.type)
            || (previewAvatar.color !== settings.value.settings.avatar.color)
            || (chosenBackground !== settings.value.settings.background);
    }

    function onSave() {
        setSaveColor('success');
        setTimeout(() => {
            setSaveColor('primary');
        }, 500);
        messageLoading().then(() => {
            messageSuccess()
        }).then(() => {
            let cpy_manager = new SettingsManager();

            cpy_manager.settings = settings.value.settings;
            cpy_manager.settings.avatar = previewAvatar;
            cpy_manager.settings.background = chosenBackground;

            settings.setValue(cpy_manager);
            settings.value.write();
        });

    }

    return (
        <div className="settings-preferences">
            {contextHolder}
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}/>
                <Button size="sm" style={{fontFamily: 'DM Sans'}} disabled={!areThereChanges()}
                        onClick={() => onSave()} color={saveColor}
                >
                    Salvați
                </Button>
            </div>
            <div className="change-bg">
                <p style={{fontSize: "1.25rem", marginBottom: '10px'}}>Schimbați fundalul aplicației:</p>
                <Radio.Group onChange={(e) => {
                    setChosenBackground(e.target.value);
                    // let copy = {...settings.value};
                    // let cpy_manager = new SettingsManager();
                    //
                    // cpy_manager.settings = copy.settings;
                    // cpy_manager.settings.background = e.target.value;
                    //
                    // settings.setValue(cpy_manager);
                    // settings.value.write();
                    //
                    // console.log(`settings.val: ${settings.value.settings.background}`);
                    // storage.value.settings.write();
                }} defaultValue={settings.value.settings.background} style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minMax(0, 1fr)",
                }} optionType={"button"}>
                    {backgrounds.map((val, index, array) => (
                        <Radio value={val} style={{
                            width: 186.6,
                            height: 105,
                            padding: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderRadius: "14px",
                            borderWidth: '1px',
                            marginBottom: "1rem",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} className="bg-grid-option">
                            <Image
                                src={val}
                                preview={false}
                                style={{
                                    borderRadius: "14px",
                                    height: 90, width: 177.7
                                }}
                            />
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
            <Divider type="horizontal"/>
            <div className="change-avatar">
                <p style={{fontSize: "1.25rem", marginBottom: '10px'}}>Configurați avatarul LiMa:</p>
                <div className="avatar-config">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>
                            <span style={{fontFamily: 'DM Sans', marginBottom: 0}}>Culoarea</span>
                            <div style={{display: 'flex'}}>
                                {swatches.map((swatch) => (
                                    <div style={{marginLeft: '5px', marginRight: '5px'}}>
                                        {swatch}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Divider type={"horizontal"}/>
                        <div>
                            <span style={{fontFamily: 'DM Sans'}}>Tipul Ochelarilor</span>
                            <Select data={data}
                                    onChange={(val) => {
                                        setChosenType(val as AvatarType)
                                    }}
                                    label=""
                                    defaultValue={chosenType}
                                    placeholder="Alegeți o variantă"
                                    itemComponent={SelectItem}
                                    searchable
                                    maxDropdownHeight={100}
                                    nothingFound="Nu există"
                                    filter={(value, item) =>
                                        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ?? false
                                    }
                            />
                        </div>
                    </div>
                    <Divider type="vertical" style={{height: '200px'}}/>
                    <div className="avatar-preview">
                        <Image
                            preview={false}
                            src={previewAvatar.getBody()} height={200} width={150}/>
                    </div>
                </div>
            </div>
        </div>
    );
}