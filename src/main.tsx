import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './components/App.css'
import { MyRoutes } from './MyRoutes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </React.StrictMode>
)

