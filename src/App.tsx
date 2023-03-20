import './App.scss'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import DefaultPage from './pages/default';
import Level1 from './pages/levels/level1';
import {PageLayout, OverallLayout} from './pages/layout';

function App() {
  let location = useLocation();

  return (
    <div className='App'>
       <NextUIProvider>
        <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<OverallLayout />}>
                <Route index element={<DefaultPage />}/>
                <Route path="levels" element={<PageLayout />}>
                  <Route path="1" element={<Level1 />}/> 
                </Route>    
              </Route>
            </Routes>
        </AnimatePresence>
       </NextUIProvider>
    </div>
  )
}

export default App;