import './App.scss'
import {BrowserRouter, Routes, Route, useLocation, RouterProvider, createHashRouter} from "react-router-dom";
import {Modal, NextUIProvider} from '@nextui-org/react';
// @ts-ignore
import {AnimatePresence} from 'framer-motion';
import MainMenu from './pages/MainMenu';
import {PageLayout, OverallLayout} from './pages/Layout';
import {ProgressContext, DifficultyContext, StorageContext, SettingsContext, DiplomaContext} from './services/context';
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
import {ConfigProvider, theme as ATheme} from "antd";
import {DiplomaManager} from "@/services/DiplomaManager";

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

    const router = createHashRouter([
        {
            path: "/",
            element: <OverallLayout/>,
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

    const returnFreshDiploma = () => {
        let a = new DiplomaManager();
        a.name = diplomaValue.name;
        return a;
    }

    return (
        <div className='App'>
            <StorageContext.Provider value={{value: storageValue, setValue: setStorageValue}}>
                <ProgressContext.Provider value={{value: progressValue, setValue: setProgressValue}}>
                    <DifficultyContext.Provider value={{value: difficultyValue, setValue: setDifficultyValue}}>
                        <SettingsContext.Provider value={{value: settingsValue, setValue: setSettingsValue}}>
                            <ConfigProvider>
                                <NextUIProvider theme={theme}>
                                    <DiplomaContext.Provider value={{value: diplomaValue, setValue: setDiplomaValue}}>
                                        <AnimatePresence mode="wait">
                                            <Modal
                                                closeButton
                                                aria-labelledby="modal-title"
                                                open={diplomaValue.openAlgebra}
                                                onClose={() => {
                                                    setDiplomaValue(
                                                        () => returnFreshDiploma()
                                                    )
                                                }}
                                            >
                                                <Modal.Header>
                                                    <h1>Algebra Diploma</h1>
                                                </Modal.Header>
                                            </Modal>
                                            <Modal
                                                closeButton
                                                aria-labelledby="modal-title"
                                                open={diplomaValue.openGeometrie}
                                                onClose={() => {
                                                    setDiplomaValue(
                                                        () => returnFreshDiploma()
                                                    )
                                                }}
                                            >
                                                <Modal.Header>
                                                    <h1>Felicitări! Ai terminat capitolul de geometrie</h1>
                                                </Modal.Header>
                                            </Modal>
                                            <Modal
                                                closeButton
                                                aria-labelledby="modal-title"
                                                open={diplomaValue.openRomana}
                                                onClose={() => {
                                                    setDiplomaValue(
                                                        () => returnFreshDiploma()
                                                    )
                                                }}
                                            >
                                                <Modal.Header>
                                                    <h1>Felicitări! Ai terminat capitolul de română</h1>
                                                </Modal.Header>
                                            </Modal>
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