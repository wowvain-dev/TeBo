import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "@fontsource/dm-sans";
import './samples/node-api'
import './index.scss'
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
