import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import '../styles/main.css'
import App from './app.jsx'
import { CartProvider } from '../context/cartcontext.jsx'
import { AuthProvider } from "../context/authcontext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<AuthProvider>
    <CartProvider>
    <App />
    </CartProvider>
</AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

