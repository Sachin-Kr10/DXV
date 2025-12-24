import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './styles/main.css'
import App from './App.jsx'
import { CartProvider } from './components/cartcontext/index.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
