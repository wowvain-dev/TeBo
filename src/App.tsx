import './App.scss'
import {BrowserRouter, Routes, Route, useLocation, RouterProvider, createHashRouter} from "react-router-dom";
import {NextUIProvider} from '@nextui-org/react';
// @ts-ignore
import {AnimatePresence} from 'framer-motion';
import MainMenu from './pages/MainMenu';
import {PageLayout, OverallLayout} from './pages/Layout';
import {ProgressContext, DifficultyContext, StorageContext} from './services/context';
import {ProgressManager} from './services/ProgressManager';
import {useState} from 'react';
import {AritmeticaPanel} from './pages/AritmeticaPanel';
import {createTheme} from '@nextui-org/react';
import {Operatii} from './pages/exercises/matematica/aritmetica/Operatii';
import {DifficultyManager} from './services/DifficultyManager';
import {Ordine} from './pages/exercises/matematica/aritmetica/Ordine';
import {Fractii} from './pages/exercises/matematica/aritmetica/Fractii';
import {Formare} from "@/pages/exercises/matematica/aritmetica/Formare";
import {Comparatii} from "@/pages/exercises/matematica/aritmetica/Comparatii";
import { RomanaPanel } from './pages/RomanaPanel';
import { Litere } from './pages/exercises/comunicare/romana/RecunoastereLitere';
import { StorageManager } from './services/StorageManager';
import { Vocale } from './pages/exercises/comunicare/romana/Vocale';
import { GeometriePanel } from './pages/GeometriePanel';
import { Culori } from './pages/exercises/matematica/geometrie/Culori';
import {CompletarePropozitie} from "@/pages/exercises/comunicare/romana/CompletarePropozitie";
import {ComparareForme} from "@/pages/exercises/matematica/geometrie/ComparareForme";

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
    const [difficultyValue, setDifficultyValue] = useState(
        new DifficultyManager()
    );
    const [storageValue, setStorageValue] = useState(new StorageManager());

    const router = createHashRouter([
        {
            path: "/",
            element: <OverallLayout />,
            children: [
                {
                    index: true,
                    element: <MainMenu />
                }, {
                    path: 'aritmetica',
                    children: [
                        {
                            index: true,
                            element: <AritmeticaPanel />
                        }, {
                            path: 'operatii',
                            element: <Operatii />
                        }, {
                            path: 'ordine',
                            element: <Ordine />
                        }, {
                            path: 'fractii',
                            element: <Fractii />
                        }, {
                            path: 'formare',
                            element: <Formare />
                        }, {
                            path: 'comparatii',
                            element: <Comparatii />
                        }
                    ]
                }, {
                    path: 'geometrie',
                    children: [
                        {
                            index: true,
                            element: <GeometriePanel />
                        }, {
                            path: 'culori',
                            element: <Culori />
                        }, {
                            path: 'regula_sirului',
                            element: <Litere />
                        }, {
                            path: 'comparare',
                            element: <ComparareForme />
                        }
                    ]
                }, {
                    path: 'romana',
                    children: [
                        {
                            index: true,
                            element: <RomanaPanel />
                        }, {
                            path: 'vocale',
                            element: <Vocale />
                        }, {
                            path: 'litere',
                            element: <Litere />
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <div className='App'>
            <StorageContext.Provider value={{value: storageValue, setValue: setStorageValue}}>
            <ProgressContext.Provider value={{value: progressValue, setValue: setProgressValue}}>
                <DifficultyContext.Provider value={{value: difficultyValue, setValue: setDifficultyValue}}>
                    <NextUIProvider theme={theme}>
                        <AnimatePresence mode="wait">
                            <RouterProvider router={router} />
                            {/*<Routes key={location.pathname} location={location}>*/}
                            {/*    <Route path="/" element={<OverallLayout/>}>*/}
                            {/*        <Route index element={<MainMenu/>}/>*/}
                            {/*        <Route path="aritmetica">*/}
                            {/*            <Route index element={<AritmeticaPanel/>}/>*/}
                            {/*            <Route path="operatii" element={<Operatii/>}/>*/}
                            {/*            <Route path="ordine" element={<Ordine/>}/>*/}
                            {/*            <Route path="fractii" element={<Fractii/>}/>*/}
                            {/*            <Route path="formare" element={<Formare/>}/>*/}
                            {/*            <Route path="comparatii" element={<Comparatii/>}/>*/}
                            {/*        </Route>*/}
                            {/*        <Route path="romana">*/}
                            {/*            <Route index element={<RomanaPanel/>}/>*/}
                            {/*            <Route path="vocale" element={<Vocale/>}/>*/}
                            {/*            <Route path="litere" element={<Litere/>}/>*/}
                            {/*        </Route>*/}
                            {/*        <Route path="geometrie">*/}
                            {/*            <Route index element={<GeometriePanel/>}/>*/}
                            {/*            <Route path="culori" element={<Culori />}/>*/}
                            {/*            <Route path="regula_sirului" element={<Litere/>}/>*/}
                            {/*            <Route path="comparare" element={<Litere/>}/>*/}
                            {/*        </Route>*/}
                            {/*    </Route>*/}
                            {/*</Routes>*/}
                        </AnimatePresence>
                    </NextUIProvider>
                </DifficultyContext.Provider>
            </ProgressContext.Provider>
            </StorageContext.Provider>
        </div>
    )
}

export default App;