import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './styles/app.css'
import { configureAxios } from './services/core'


configureAxios()

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <App />
)
