import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CustomProvider from './redux/provider.jsx'
import ToastSetup from './components/utils/ToastSetup.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CustomProvider>
      <ToastSetup/>
      <App />
    </CustomProvider>
  // </React.StrictMode>
)
