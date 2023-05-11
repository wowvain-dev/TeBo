import './App.scss'
import {BrowserRouter, Routes, Route, useLocation, RouterProvider, createHashRouter} from "react-router-dom";
import {NextUIProvider} from '@nextui-org/react';
// @ts-ignore
import {AnimatePresence} from 'framer-motion';
import MainMenu from './pages/MainMenu';
import {PageLayout, OverallLayout} from './pages/Layout';
import {ProgressContext, DifficultyContext, StorageContext, SettingsContext} from './services/context';
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
    }, []);

    return (
        <div className='App'>
            <StorageContext.Provider value={{value: storageValue, setValue: setStorageValue}}>
                <ProgressContext.Provider value={{value: progressValue, setValue: setProgressValue}}>
                    <DifficultyContext.Provider value={{value: difficultyValue, setValue: setDifficultyValue}}>
                        <SettingsContext.Provider value={{value: settingsValue, setValue: setSettingsValue}}>
                            <NextUIProvider theme={theme}>
                                <AnimatePresence mode="wait">
                                    <RouterProvider router={router}/>
                                </AnimatePresence>
                            </NextUIProvider>
                        </SettingsContext.Provider>
                    </DifficultyContext.Provider>
                </ProgressContext.Provider>
            </StorageContext.Provider>
        </div>
    )
}

export default App;