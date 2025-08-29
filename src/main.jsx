import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/global.scss'
import App from './App.jsx'
import './i18n.js'
import Providers from "./context/Providers.jsx";


createRoot(document.getElementById('root')).render(
    // <StrictMode>
        <Providers>
            <App/>
        </Providers>
    // </StrictMode>,
)


