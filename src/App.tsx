import './App.scss'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';
// @ts-ignore
import {AnimatePresence} from 'framer-motion';
import DefaultPage from './pages/default';
import Level1 from './pages/levels/level1';
import {PageLayout, OverallLayout} from './pages/layout';
import Level2 from './pages/levels/level2';
import Level3 from './pages/levels/level3';
import {ProgressContext, DifficultyContext, StorageContext} from './services/context';
import {ProgressManager} from './services/ProgressManager';
import {useState} from 'react';
import {AritmeticaPanel} from './pages/exercises/matematica/aritmetica/aritmetica_panel';
import {createTheme} from '@nextui-org/react';
import {Operatii} from './pages/exercises/matematica/aritmetica/operatii';
import {DifficultyManager} from './services/DifficultyManager';
import {Ordine} from './pages/exercises/matematica/aritmetica/ordine';
import {Fractii} from './pages/exercises/matematica/aritmetica/fractii';
import {Formare} from "@/pages/exercises/matematica/aritmetica/formare";
import {Comparatii} from "@/pages/exercises/matematica/aritmetica/comparatii";
import { RomanaPanel } from './pages/exercises/comunicare/romana/romana_panel';
import { Litere } from './pages/exercises/comunicare/romana/recunoastere_litere';
import { StorageManager } from './services/StorageManager';
import { Vocale } from './pages/exercises/comunicare/romana/vocale';
import { GeometriePanel } from './pages/exercises/matematica/geometrie/geometrie_panel';
import { Culori } from './pages/exercises/matematica/geometrie/culori';

const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            // // brand colors
            // primaryLight: '$green200',
            // primaryLightHover: '$green300',
            // primaryLightActive: '$green400',
            // primaryLightContrast: '$green600',
            // primary: '#4ADE7B',
            // primaryBorder: '$green500',
            // primaryBorderHover: '$green600',
            // primarySolidHover: '$green700',
            // primarySolidContrast: '$white',
            // primaryShadow: '$green500',

            // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            // link: '#5E1DAD',

            // you can also create your own color
            normalWhite: '#fefefe'

            // ...  more colors
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

    // progressValue.initialize();

    let location = useLocation();

    return (
        <div className='App'>
            <StorageContext.Provider value={{value: storageValue, setValue: setStorageValue}}>
            <ProgressContext.Provider value={{value: progressValue, setValue: setProgressValue}}>
                <DifficultyContext.Provider value={{value: difficultyValue, setValue: setDifficultyValue}}>
                    <NextUIProvider theme={theme}>
                        <AnimatePresence mode="wait">
                            <Routes key={location.pathname} location={location}>
                                <Route path="/" element={<OverallLayout/>}>
                                    <Route index element={<DefaultPage/>}/>
                                    <Route path="levels" element={<PageLayout/>}>
                                        <Route path="1">
                                            <Route index element={<Level1/>}/>
                                            <Route path="geometrie" element={<div></div>}/>
                                            <Route path="aritmetica">
                                                <Route index element={<AritmeticaPanel/>}/>
                                                <Route path="operatii" element={<Operatii/>}/>
                                                <Route path="ordine" element={<Ordine/>}/>
                                                <Route path="fractii" element={<Fractii/>}/>
                                                <Route path="formare" element={<Formare/>}/>
                                                <Route path="comparatii" element={<Comparatii/>}/>
                                            </Route>
                                            <Route path="romana">
                                                <Route index element={<RomanaPanel/>}/>
                                                <Route path="vocale" element={<Vocale/>}/>
                                                <Route path="litere" element={<Litere/>}/>
                                            </Route>
                                            <Route path="geometrie">
                                                <Route index element={<GeometriePanel/>}/>
                                                <Route path="culori" element={<Culori />}/>
                                                <Route path="regula_sirului" element={<Litere/>}/>
                                                <Route path="comparare" element={<Litere/>}/>
                                            </Route>
                                        </Route>
                                        <Route path="2">
                                            <Route index element={<Level2/>}/>
                                        </Route>
                                        <Route path="3">
                                            <Route index element={<Level3/>}/>
                                        </Route>
                                    </Route>
                                </Route>
                            </Routes>
                        </AnimatePresence>
                    </NextUIProvider>
                </DifficultyContext.Provider>
            </ProgressContext.Provider>
            </StorageContext.Provider>
        </div>
    )
}

export default App;