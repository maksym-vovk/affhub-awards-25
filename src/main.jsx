import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import App from './App.jsx'
import './i18n.js'
import ContextProviders from "./context/ContextProviders.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ContextProviders>
          <App />
      </ContextProviders>
  </StrictMode>,

)
