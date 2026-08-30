import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { SalesProvider } from './contexts/SalesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <SalesProvider>
      <App />
    </SalesProvider>
    
  </BrowserRouter>,
  </StrictMode>,
)
