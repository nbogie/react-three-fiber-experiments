import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { MyRoutes } from './MyRoutes'

import './components/App.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <MyRoutes />
    </HashRouter>
  </React.StrictMode>
)

