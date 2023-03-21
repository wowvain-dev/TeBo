import './App.scss'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import DefaultPage from './pages/default';
import Level1 from './pages/levels/level1';
import {PageLayout, OverallLayout} from './pages/layout';
import Level2 from './pages/levels/level2';
import Level3 from './pages/levels/level3';
import { ProgressContext, ProgressManager } from './helpers/context';
import { useState } from 'react';

function App() {
  const [progressValue, setProgressValue] = useState(
    new ProgressManager()
  );
  let location = useLocation();

  return (
    <div className='App'>
      <ProgressContext.Provider value={{value: progressValue, setValue: setProgressValue}}>
       <NextUIProvider>
        <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<OverallLayout />}>
                <Route index element={<DefaultPage />}/>
                <Route path="levels" element={<PageLayout />}>
                  <Route path="1">
                    <Route index element={<Level1 />}/>   
                  </Route> 
                  <Route path="2">
                    <Route index element={<Level2 />}/>
                  </Route>
                  <Route path="3">
                    <Route index element={<Level3 />}/>
                  </Route>
                </Route>    
              </Route>
            </Routes>
        </AnimatePresence>
       </NextUIProvider>
      </ProgressContext.Provider>
    </div>
  )
}

export default App;