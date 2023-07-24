import './App.scss'
import styles from './diploma.scss';
import {BrowserRouter, Routes, Route, useLocation, RouterProvider, createHashRouter} from "react-router-dom";
import {Button, Modal, NextUIProvider, Spacer} from '@nextui-org/react';
// @ts-ignore
import {AnimatePresence} from 'framer-motion';
import MainMenu from './pages/MainMenu';
import {PageLayout, OverallLayout} from './pages/Layout';
import {
    ProgressContext,
    DifficultyContext,
    StorageContext,
    SettingsContext,
    DiplomaContext,
    useSettingsContext
} from './services/context';
import {ProgressManager} from './services/ProgressManager';
import {useEffect, useState} from 'react';
import {AritmeticaPanel} from './pages/AritmeticaPanel';
import {createTheme} from '@nextui-org/react';
import {Operatii} from './pages/exercises/matematica/aritmetica/Operatii';
import {DifficultyManager} from './services/DifficultyManager';
import {Ordine} from './pages/exercises/matematica/aritmetica/Ordine';
import {Fractii} from './pages/exercises/matematica/aritmetica/Fractii';
import {Formare} from "@/pages/exercises/matematica/aritmetica/Formare";
import {Comparatii} from "@/pages/exercises/matematica/aritmetica/Comparatii";
import {RomanaPanel} from './pages/RomanaPanel';
import {Litere} from './pages/exercises/comunicare/romana/RecunoastereLitere';
import {StorageManager} from './services/StorageManager';
import {Vocale} from './pages/exercises/comunicare/romana/Vocale';
import {GeometriePanel} from './pages/GeometriePanel';
import {Culori} from './pages/exercises/matematica/geometrie/Culori';
import {ComparareForme} from "@/pages/exercises/matematica/geometrie/ComparareForme";
import {backgrounds} from "./services/context";
import {SettingsManager} from "@/services/SettingsManager";
import {DesenareFiguri} from "@/pages/exercises/matematica/geometrie/DesenareFiguri";
import LineDrawingCanvas from "@/components/LineDrawingCanvas";
import {ConfigProvider, Image, theme as ATheme, Input} from "antd";
import {DiplomaManager} from "@/services/DiplomaManager";
import './welcome.scss';
import {TiUserOutline} from "react-icons/all";
import {existsSync, readFileSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import {Diploma} from "@/components/Diploma";
import {Adevar} from "@/pages/exercises/comunicare/romana/Adevar";
import {CompletareParagraf} from "@/pages/exercises/comunicare/romana/CompletareParagraf";

const theme = createTheme({
    type: "light",
    theme: {
        colors: {
            normalWhite: '#fefefe'
        },
        space: {},
        fonts: {
            default: "DM Sans"
        }
    }
});

function App() {
    const [IS_COLD_START, setColdStart] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState(
        new ProgressManager()
    );
    const [settingsValue, setSettingsValue] =
        useState(new SettingsManager());
    const [difficultyValue, setDifficultyValue] = useState(
        new DifficultyManager()
    );
    const [diplomaValue, setDiplomaValue] = useState(new DiplomaManager());
    const [storageValue, setStorageValue] = useState(new StorageManager());

    const [openAlgebra, setOpenAlgebra] = useState<boolean>(false);
    const [openGeometrie, setOpenGeometrie] = useState<boolean>(false);
    const [openRomana, setOpenRomana] = useState<boolean>(false);

    useEffect(() => {
        setDiplomaValue({
            openRomana, openAlgebra, openGeometrie,
            setOpenAlgebra,
            setOpenGeometrie,
            setOpenRomana
        });
        setColdStart(false);
        if (!existsSync(join(homedir(), 'TeBo', 'storage'))) {
           setColdStart(true);
           return;
        }
        if (existsSync(join(homedir(), 'TeBo', 'storage', 'settings.json'))) {
            let s_file = readFileSync(join(homedir(), 'TeBo', 'storage', 'settings.json'), {
                encoding: 'utf-8', flag: 'r'
            });
            if (s_file.length === 0) {
                setColdStart(true);
                return;
            }
            let s_json = JSON.parse(s_file);
            if (s_json.name === "") {
                setColdStart(true);
                return;
            }
        }
        // if (!existsSync(join(homedir(), 'TeBo', 'storage'))) {
        //     setColdStart(true);
        // } else if (existsSync(join(homedir(), 'TeBo', 'storage', 'progress.json')) && existsSync(join(homedir(), 'TeBo', 'storage', 'settings.json'))) {
        //     let p_file = readFileSync(join(homedir(), 'TeBo', 'storage', 'progress.json'), {
        //         encoding: 'utf-8', flag: 'r'
        //     });
        //     if (p_file.length === 0 || s_file.length === 0) {
        //         setColdStart(true);
        //     } else {
        //         let s_json = JSON.parse(s_file);
        //         if (s_json.name === "") {
        //             setColdStart(true);
        //             let p_json = JSON.parse(p_file);
        //
        //             let level = p_json.levels[0];
        //
        //             if (level.comunicare.romana.litere[0] === 0 &&
        //                 level.comunicare.romana.vocale[0] === 0 &&
        //                 level.matematica.aritmetica.operatii[0] === 0 &&
        //                 level.matematica.aritmetica.ordine[0] === 0 &&
        //                 level.matematica.aritmetica.fractii[0] === 0 &&
        //                 level.matematica.aritmetica.formare[0] === 0 &&
        //                 level.matematica.aritmetica.comparatii[0] === 0 &&
        //                 level.matematica.geometrie.culori[0] === 0 &&
        //                 level.matematica.geometrie.comparare[0] === 0
        //             ) {
        //                 setColdStart(true);
        //             }
        //         } else {
        //             setColdStart (false);
        //         }
        //     }
        // }

    }, []);

    const router = createHashRouter([
        {
            path: "/",
            element: <OverallLayout setColdStart={setColdStart}/>,
            children: [
                {
                    index: true,
                    element: <MainMenu/>
                }, {
                    path: 'aritmetica',
                    children: [
                        {
                            index: true,
                            element: <AritmeticaPanel/>
                        }, {
                            path: 'operatii',
                            element: <Operatii/>
                        }, {
                            path: 'ordine',
                            element: <Ordine/>
                        }, {
                            path: 'fractii',
                            element: <Fractii/>
                        }, {
                            path: 'formare',
                            element: <Formare/>
                        }, {
                            path: 'comparatii',
                            element: <Comparatii/>
                        }
                    ]
                }, {
                    path: 'geometrie',
                    children: [
                        {
                            index: true,
                            element: <GeometriePanel/>
                        }, {
                            path: 'culori',
                            element: <Culori/>
                        }, {
                            path: 'regula_sirului',
                            element: <Litere/>
                        }, {
                            path: 'comparare',
                            element: <ComparareForme/>
                        }, {
                            path: 'desenare_figuri',
                            element: <DesenareFiguri/>
                        }
                    ]
                }, {
                    path: 'romana',
                    children: [
                        {
                            index: true,
                            element: <RomanaPanel/>
                        }, {
                            path: 'vocale',
                            element: <Vocale/>
                        }, {
                            path: 'litere',
                            element: <Litere/>
                        }, {
                            path: 'adevar',
                            element: <Adevar/>
                        }, {
                            path: 'paragraf',
                            element: <CompletareParagraf/>
                        }
                    ]
                }
            ]
        }
    ]);

    useEffect(() => {
        let settings = new SettingsManager();
        settings.settings.background = backgrounds[0];
        setSettingsValue(settings);
    }, []);

    const settings = useSettingsContext();
    const avatar = settings.value.settings.avatar;

    useEffect(() => {
        setDifficultyValue(difficultyValue);
    }, [IS_COLD_START]);

    const [nameVal, setNameVal] = useState<string>("");
    const [letsStart, setLetsStart] = useState<boolean>(false);

    return (
        <div className='App'>
            <StorageContext.Provider value={{value: storageValue, setValue: setStorageValue}}>
                <ProgressContext.Provider value={{value: progressValue, setValue: setProgressValue}}>
                    <DifficultyContext.Provider value={{value: difficultyValue, setValue: setDifficultyValue}}>
                        <SettingsContext.Provider value={{value: settingsValue, setValue: setSettingsValue}}>
                            <ConfigProvider>
                                <NextUIProvider theme={theme}>
                                    <DiplomaContext.Provider value={{value: diplomaValue}}>
                                        <AnimatePresence mode="wait">
                                            <Modal aria-labelledby="modal-title"
                                                   blur
                                                   preventClose
                                                   open={IS_COLD_START}
                                                   onClose={() => {
                                                       setColdStart(false);
                                                   }}
                                                   className="welcome"
                                            >
                                                <Modal.Header css={{
                                                    borderBottom: '2px solid #ccc'
                                                }}>
                                                    <h2 className="welcome-header"> Salut! Bine ai venit la
                                                        TeBo!</h2>
                                                </Modal.Header>
                                                {/*TODO: MAKE POP-UP NOT SHOW IF NAME IS SAVED*/}
                                                <Modal.Body>
                                                    <div className="welcome-body">
                                                        <div>
                                                            <p style={{
                                                                fontFamily: 'DM Sans',
                                                                fontSize: '18px'
                                                            }}>Exersează-ți
                                                                cunoștiințele cu exerciții de aritmetică,
                                                                geometrie și română!</p>
                                                            <p style={{fontFamily: 'DM Sans', fontSize: '18px'}}>Vom
                                                                învăța multe
                                                                împreună, așa că hai să facem
                                                                cunoștiință! Pe mine mă cheamă <b>Tebo</b>, pe tine cum
                                                                te
                                                                cheamă?</p>
                                                            <Spacer y={1}/>
                                                            <div style={{}}>
                                                                <Input placeholder="Introduce-ți numele" size='large'
                                                                       prefix={<TiUserOutline size={24}/>}
                                                                       onChange={(e) => {
                                                                           setNameVal(e.target.value);
                                                                       }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Spacer x={2}/>
                                                        <div>
                                                            <Image src={avatar.getBody()} width={150} height={200}
                                                                   preview={false}/>
                                                        </div>
                                                    </div>
                                                    <div className="welcome-save">
                                                        <Button onPress={() => {
                                                            setColdStart(false)
                                                            setLetsStart(true);
                                                            setTimeout(() => {
                                                                setLetsStart(false);
                                                                let new_settings = new SettingsManager();
                                                                new_settings.settings = settingsValue.settings;
                                                                new_settings.settings.name = nameVal;
                                                                setSettingsValue(new_settings);
                                                                settingsValue.write();
                                                            }, 2000);
                                                        }}
                                                                disabled={nameVal.length <= 2}
                                                        >Încântat de cunoștiință</Button>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                            <Modal open={letsStart} blur>
                                                <Modal.Body>
                                                    <Spacer y={2}/>
                                                    <h2 style={{
                                                        textAlign: 'center',
                                                        fontFamily: 'DM Sans',
                                                        fontWeight: 600,
                                                    }}>Hai să ne apucăm de exersat, {nameVal}!</h2>
                                                    <Spacer y={2}/>
                                                </Modal.Body>
                                            </Modal>
                                            <Diploma subject="aritmetică" open={openAlgebra} setClose={(a) => setOpenAlgebra(a)} />
                                            <Diploma subject="geometrie" open={openGeometrie} setClose={(a) => setOpenGeometrie(a)}/>
                                            <Diploma subject="română" open={openRomana} setClose={(a) => setOpenRomana(a)}/>
                                            <RouterProvider router={router}/>
                                        </AnimatePresence>
                                    </DiplomaContext.Provider>
                                </NextUIProvider>
                            </ConfigProvider>
                        </SettingsContext.Provider>
                    </DifficultyContext.Provider>
                </ProgressContext.Provider>
            </StorageContext.Provider>
        </div>
    )
}

export default App;
