import React from 'react'
import ReactDOM from 'react-dom/client'
import { PineTreeField } from './components/PineTreeField'
import PineTreeFieldDemo from './components/PineTreeFieldDemo'
import TruchetDemo from './components/TruchetDemo'
import './components/App.css';
import { TextBoxesDemo } from './TextBoxesDemo'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <TruchetDemo /> */}
    <TextBoxesDemo />
    {/* <PineTreeFieldDemo /> */}
  </React.StrictMode>
)

