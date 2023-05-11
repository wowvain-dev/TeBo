import {Button} from "@nextui-org/react";
import {useSettingsContext, useStorageContext} from "@/services/context";
import {backgrounds} from "@/services/context";
import {Radio, Image} from "antd";
import {SettingsManager} from "@/services/SettingsManager";

export function PreferencesSettings() {
    const settings = useSettingsContext();
    const storage = useStorageContext();

    return (
        <div className="settings-preferences">
            <div className="change-bg">
                <p>Schimbați fundalul aplicației:</p>
                <Radio.Group onChange={(e) => {
                    let copy = {...settings.value};
                    let cpy_manager = new SettingsManager();

                    cpy_manager.settings = copy.settings;
                    cpy_manager.settings.background = e.target.value;

                    settings.setValue(cpy_manager);
                    settings.value.write();

                    console.log(`settings.val: ${settings.value.settings.background}`);
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
                            <Image src={val}
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
        </div>
    );
}